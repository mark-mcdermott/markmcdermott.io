// @ts-check
import { readdirSync } from 'node:fs'

import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

/*
 * The posts used to be served at their filenames, prefix and all, so
 * /writing/26-08-15-twenty-years-in-austin is a live URL somebody may have
 * linked to. Every prefixed name keeps working and points at the new one.
 *
 * Read from the folder rather than listed by hand: a post added later gets its
 * redirect without anybody remembering to add one.
 */
const DATE_PREFIX = /^\d{2}-\d{2}-\d{2}-/

const redirects = Object.fromEntries(
  readdirSync('./src/content/writing')
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.slice(0, -'.md'.length))
    .filter((id) => DATE_PREFIX.test(id))
    .map((id) => [`/writing/${id}`, `/writing/${id.replace(DATE_PREFIX, '')}`])
)

// https://astro.build/config
export default defineConfig({
  redirects,
  vite: {
    plugins: [tailwindcss()]
  }
});
