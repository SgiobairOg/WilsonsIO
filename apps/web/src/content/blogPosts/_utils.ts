import type { CollectionEntry } from 'astro:content';

export const postUrlFromSlug = function(slug: CollectionEntry<'blogPosts'>['slug']): string {
  const [lang,token] = slug.split('/');
  return `/${lang}/blog/${token}`
}