import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

let ui, temporary;
before(async () => {
  const cache = resolve("node_modules/.cache");
  await mkdir(cache, { recursive: true });
  temporary = await mkdtemp(`${cache}/potato-ui-`);
  const outfile = `${temporary}/components.mjs`;
  await build({
    stdin: {
      contents: `export * from './src/development/catalog'; export * from './src/development/demos'; export * from './src/components/ui/data'; export * from './src/components/GlassUI'; export { I18nProvider } from './src/i18n'; export { ThemeProvider } from './src/hooks/useTheme';`,
      resolveDir: process.cwd(),
      loader: "tsx",
    },
    outfile,
    bundle: true,
    format: "esm",
    platform: "node",
    packages: "external",
    loader: { ".css": "empty" },
  });
  ui = await import(pathToFileURL(outfile).href);
});
after(async () => {
  if (temporary) await rm(temporary, { recursive: true, force: true });
});

test("all 66 documented components have unique routes and render real demos", () => {
  assert.equal(ui.componentDocs.length, 66);
  assert.equal(new Set(ui.componentDocs.map((doc) => doc.slug)).size, 66);
  for (const doc of ui.componentDocs) {
    const html = renderToStaticMarkup(
      React.createElement(
        ui.I18nProvider,
        null,
        React.createElement(
          ui.ThemeProvider,
          null,
          React.createElement(ui.ComponentDemo, { doc }),
        ),
      ),
    );
    assert.ok(html.length > 100, `${doc.title} must render content`);
    assert.ok(
      doc.api && doc.behavior,
      `${doc.title} must document its API and behavior`,
    );
  }
});

test("every copyable example typechecks against its actual source module", () => {
  const { config } = ts.readConfigFile("tsconfig.json", ts.sys.readFile);
  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, process.cwd());
  const examples = new Map(
    ui.componentDocs.map((doc) => [
      resolve(`src/__example_${doc.slug}.tsx`),
      ui.usageCode(doc),
    ]),
  );
  const host = ts.createCompilerHost(parsed.options);
  const original = host.getSourceFile.bind(host);
  host.getSourceFile = (name, language, onError, shouldCreate) =>
    examples.has(resolve(name))
      ? ts.createSourceFile(
          name,
          examples.get(resolve(name)),
          language,
          true,
          ts.ScriptKind.TSX,
        )
      : original(name, language, onError, shouldCreate);
  const program = ts.createProgram([...examples.keys()], parsed.options, host);
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => "\n",
    }),
  );
});

test("progress clamps values and table handles an empty result set", () => {
  const progress = renderToStaticMarkup(
    React.createElement(ui.GlassProgress, { value: 250, label: "Upload" }),
  );
  assert.match(progress, /aria-valuenow="100"/);
  const table = renderToStaticMarkup(
    React.createElement(ui.GlassDataTable, {
      columns: [{ key: "name", label: "Name" }],
      rows: [],
      caption: "Projects",
    }),
  );
  assert.match(table, /No results/);
  assert.match(table, /Previous page/);
  assert.match(table, /Next page/);
});
