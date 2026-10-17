import test from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { readFileSync } from 'node:fs';

// Exercise the actual URL-building and public-link validation code without a browser.
const source = readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8')
  .replaceAll('import.meta.env', '({})');
const compiled = ts.transpile(source, { module: ts.ModuleKind.ESNext });
const { contactMailto, isPublishedUrl } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);

test('contact draft preserves punctuation, Unicode, line breaks and literal plus signs', () => {
  const result = contactMailto('hello@portfolio.dev', {
    name: 'Thu Nguyễn', email: 'thu+work@example.org', subject: 'Coffee & code?',
    message: 'Xin chào!\nA+B = C & D #1',
  });
  const url = new URL(result);
  assert.equal(decodeURIComponent(url.pathname), 'hello@portfolio.dev');
  assert.equal(url.searchParams.get('subject'), 'Coffee & code?');
  assert.equal(url.searchParams.get('body'), 'Xin chào!\nA+B = C & D #1\n\nFrom: Thu Nguyễn <thu+work@example.org>');
});

test('unpublished and unsafe project links are rejected', () => {
  for (const value of [undefined, '', '#', 'javascript:alert(1)', 'http://site.dev', 'https://example.com', 'https://demo.app.example.com', 'https://github.com/example/project']) {
    assert.equal(isPublishedUrl(value), false, String(value));
  }
  assert.equal(isPublishedUrl('https://github.com/taxvui/potato'), true);
  assert.equal(isPublishedUrl('https://taxvui.github.io/potato/'), true);
});
