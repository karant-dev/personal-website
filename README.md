# karant.dev

Personal website of [Karan Thakkar](https://karant.dev).

## How it works

- **Source:** Pages are written in plain Markdown (`index.md`, `p/*.md`).
- **Build:** Converted to lightweight static HTML using [Pandoc](https://pandoc.org/) and a simple `Makefile`.
- **Pre-commit:** A Git pre-commit hook automatically runs `make` and stages compiled `.html` files and `sitemap.xml` on every commit, ensuring the static site is always up to date.
- **Hosting:** Served as static files via Cloudflare Pages with zero server-side build step required.

## Commands

```sh
make          # compile all HTML pages and sitemap.xml
make preview  # build and open index.html locally
make clean    # remove compiled HTML files and sitemap.xml
```

## Credits

Site template adapted from [markdownhomepage](https://github.com/markdownhomepage/markdownhomepage.github.io) by [Stephen Turner](https://stephenturner.us).
