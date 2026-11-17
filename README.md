# A minimal personal website

TL;DR: edit a few markdown files and run `make`. That's it. It is the setup behind [stephenturner.us](https://stephenturner.us).

A small static site you can fork and make your own. Pages are written in Markdown and converted to HTML with [pandoc](https://pandoc.org/). There is no JavaScript framework, no build pipeline beyond a Makefile, and the whole thing is about a dozen files less than 100kb. It has a centered homepage with a portrait and link buttons, light and dark mode, social-preview and search metadata, a generated sitemap, and a contact form that works on Netlify without any server code.

## Quick start

You need [pandoc](https://pandoc.org/installing.html) and `make`.

```sh
brew install pandoc    # or apt install pandoc, etc.
make                   # build every page and sitemap.xml
make preview           # build, then open index.html (macOS; edit the Makefile for xdg-open on Linux)
```

Then:

1. Edit [`site.yaml`](./site.yaml): your production URL, name, analytics code, and the structured data for the homepage.
2. Edit [`index.md`](./index.md): your name, description, bio, and the buttons in `links`.
3. Add a square-ish photo at `files/headshot.jpg` and uncomment the `image` line in `index.md` (and `social-image` in `site.yaml` for link previews).
4. Replace `favicon.svg`, or swap in a `favicon.ico` and change the `<link rel="icon">` line in `template.html`.
5. Update the vanity links in [`_redirects`](./_redirects).
6. Run `make`, commit the generated `.html` files, and deploy.

## How it works

Every `.md` file in the root and in `p/` becomes a same-named `.html` file. `template.html` is the pandoc template, `style.css` is the only stylesheet, and `site.yaml` supplies site-wide values to every page.

```
site.yaml        site-wide settings (URL, name, analytics, JSON-LD)
index.md         homepage
p/*.md           every other page, served at /p/<name>
template.html    pandoc template shared by all pages
style.css        light and dark styles
_redirects       Netlify redirects and vanity short links
404.html         hand-written not-found page
files/           static files, served as-is at /files/<name>
Makefile         builds pages and sitemap.xml
```

The generated `.html` files are committed on purpose, so the host needs no build step. Never edit them directly; edit the `.md` and run `make`. `make clean` deletes them.

### Adding a page

Create `p/recipes.md`:

```markdown
---
title: Recipes
description: "A one-sentence summary used for search results and link previews."
---

Content in plain Markdown.
```

Run `make`. It is now at `/p/recipes`. Add `/recipes  /p/recipes.html` to `_redirects` if you want a shorter URL.

### Frontmatter the template understands

| Field | Effect |
| --- | --- |
| `title` | The page `<h1>`, the `<title>`, and the og/twitter title. |
| `description` | Meta description and og/twitter description. |
| `image` | Renders a circular portrait above the title and is used as the link-preview image. |
| `links` | A list of `label` and `url` pairs, rendered as pill buttons that open in a new tab. |
| `home: true` | Centers the page at full height and emits the JSON-LD `Person` block from `site.yaml`. |

Anything set in a page's frontmatter overrides `site.yaml`.

### Site settings

`site.yaml` is passed to pandoc with `--metadata-file`, and the Makefile reads `url` from it for canonical links and the sitemap. Delete `goatcounter` for no analytics, or delete the `person` block if you don't want structured data. The `person` values are written into JSON unescaped, so avoid double quotes in them.

### Markdown served next to the HTML

Each page's source is deliberately published at the same path with a `.md` extension (`/index.md`, `/p/about.md`), and the HTML advertises it with `<link rel="alternate" type="text/markdown">`. It makes the site easy for people and for LLM tools to read. If you don't want that, delete the `mdpath` lines in `template.html` and add redirects for the `.md` paths.

## Deploying

### Netlify (recommended)

Connect the repository in Netlify, leave the build command empty, and set the publish directory to the repository root. Netlify picks up `_redirects` and `404.html` automatically, and it detects the contact form (the `data-netlify="true"` attribute in `p/contact.md`) at deploy time. Submissions appear under Forms in the Netlify dashboard, where you can send them to an email address. The page never contains your address.

### Anywhere else

Any static host works (GitHub Pages, Cloudflare Pages, S3, a plain web server). Two things will not carry over: `_redirects` is Netlify's format, so you would translate the short links to your host's equivalent, and the contact form needs a different backend such as Formspree or a mailto link. On GitHub Pages, project sites live under a subpath, which breaks the root-relative links in the template, so use a custom domain or a `username.github.io` repository.

## Notes

- `README.md` is skipped by the Makefile and blocked from being served by `_redirects`. If you add other root-level Markdown files that are not pages, add them to the `filter-out` list in the Makefile.
- The `.gitignore` keeps macOS junk out of the repo. Add whatever else your editor produces.
