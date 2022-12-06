import type { AstroGlobal } from "astro";
import navList from "../constants/nav";
import { readdir } from "node:fs/promises";

export const getLanguageFromURL = (pathname: string) => {
  const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//);
  return langCodeMatch ? langCodeMatch[1] : "en";
};

/** Remove \ and / from beginning of string */
export const removeLeadingSlash = (path: string) => {
  return path.replace(/^[/\\]+/, "");
};

/** Remove \ and / from end of string */
export const removeTrailingSlash = (path: string) => {
  return path.replace(/[/\\]+$/, "");
};

/** Remove the subpage segment of a URL string */
export const removeSubpageSegment = (path: string) => {
  // Include new pages with subpages as part of this if statement.
  if (/(?:install|deploy|integrations-guide|tutorial)\//.test(path)) {
    return path.slice(0, path.lastIndexOf("/"));
  }
  return path;
};

type NavDictionaryKeys = typeof navList[number]["key"];
export type NavDict = ({
  text: string;
  key: NavDictionaryKeys;
  isFallback?: boolean;
} & ({ slug: string } | { header: true }))[];

const nav: NavDict = navList;

/**
 * Get paths for all Markdown files that are contained in `dir` and its children.
 * We’re doing this manually instead of using `import.meta.glob` because that was triggering
 * all Markdown files to be reloaded by Astro when one file changed, which was exteremely slow.
 * @param dir The directory to search in.
 */
async function getAllMarkdownPaths(dir: URL, files: URL[] = []) {
  // Ensure a trailing slash so files are resolved correctly relative to this directory.
  if (dir.href.at(-1) !== "/") dir.pathname += "/";
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      if (entry.isDirectory()) {
        return await getAllMarkdownPaths(new URL(entry.name, dir), files);
      } else if (entry.name.endsWith(".md")) {
        files.push(new URL(entry.name, dir));
      }
    })
  );
  return files;
}

/** If a nav entry’s slug is not found, mark it as needing fallback content. */
export const markFallbackNavEntries = async (nav: NavDict) => {
  // import.meta.url is `./src/i18n/util.ts` in dev but `./dist/entry.js` in build.
  const dirURL = new URL(
    import.meta.env.DEV ? `../pages/` : `../src/pages/`,
    import.meta.url
  );
  const urlToSlug = (url: URL) => url.pathname.split(`/src/pages/`)[1];
  const markdownSlugs = new Set(
    (await getAllMarkdownPaths(dirURL)).map(urlToSlug)
  );

  for (const entry of nav) {
    if ("header" in entry) continue;
    if (
      !(
        markdownSlugs.has(entry.slug + ".md") ||
        markdownSlugs.has(entry.slug + "/index.md")
      )
    ) {
      entry.isFallback = true;
    }
  }
  return nav;
};

/** Get the navigation sidebar content for the current language. */
export async function getNav(): Promise<NavDict> {
  return await markFallbackNavEntries(nav);
}
