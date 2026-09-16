import type { CollectionEntry } from 'astro:content'

/**
 * A post's id is its filename without the extension, and the filenames carry a
 * `YY-MM-DD-` prefix so they sort by date in the folder. That prefix is for the
 * folder, not for the reader: the URL is the slug on its own.
 *
 * An explicit `slug` in the front matter wins, which is also how the app that
 * publishes these decides what to call them.
 */
const DATE_PREFIX = /^\d{2}-\d{2}-\d{2}-/

export function postSlug(post: CollectionEntry<'writing'>): string {
  return post.data.slug ?? post.id.replace(DATE_PREFIX, '')
}

export function postHref(post: CollectionEntry<'writing'>): string {
  return `/writing/${postSlug(post)}`
}
