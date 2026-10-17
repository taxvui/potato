import React from 'react';
import { useI18n } from '../hooks/useI18n';

interface SocialLinkProps {
  item: { name: string; url: string };
  id: string;
  className: string;
  children: React.ReactNode;
}

// Preserve the design while making unavailable destinations explicit.
export const SocialLink: React.FC<SocialLinkProps> = ({ item, id, className, children }) => {
  const { t } = useI18n();
  if (!item.url) return (
    <span id={id} className={`${className} cursor-default`} role="link" aria-disabled="true"
      tabIndex={0} aria-label={`${item.name}: ${t.contact.socialPending}`}
      title={`${item.name}: ${t.contact.socialPending}`}>
      {children}
    </span>
  );
  return (
    <a id={id} className={className} href={item.url} target="_blank" rel="noopener noreferrer"
      aria-label={item.name} title={item.name}>{children}</a>
  );
};
