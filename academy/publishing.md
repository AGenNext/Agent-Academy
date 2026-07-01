# Academy Publishing Plan

This repo should become a publishable learning portal while remaining Git-native.

## Publishing Goals

- Keep courses versioned in GitHub.
- Publish a navigable documentation site.
- Support search and deep links.
- Support certification pages.
- Support course metadata.
- Support future downloadable PDFs.
- Keep contribution and review simple.

## Recommended Phase 1: Static Docs Site

Start with a lightweight static documentation site.

### Recommended Options

| Option | Why |
|---|---|
| Docusaurus | strong docs UX, versioning, sidebar, search ecosystem |
| VitePress | simple, fast, Markdown-first |
| MkDocs Material | clean docs, search, good course navigation |
| mdBook | excellent book-style technical courses |

## Recommended Initial Choice

Use **Docusaurus** if the Academy is intended to become a portal with multiple tracks, sidebars, search, versioning, blog, and certification pages.

Use **mdBook** if the immediate priority is a book-like learning experience.

For AGenNext Academy, the recommended default is:

```text
Docusaurus for portal
mdBook for book exports later
```

## Proposed Site Structure

```text
site/
├── docs/
│   ├── academy/
│   ├── courses/
│   ├── learning-paths/
│   └── certifications/
├── sidebars.ts
├── docusaurus.config.ts
├── package.json
└── README.md
```

## Domain Options

| Domain | Use |
|---|---|
| academy.agnext.com | primary academy brand |
| learn.agnext.com | simpler learner-facing entry |
| courses.agnext.com | direct course catalog |
| developers.agnxxt.com/academy | developer portal integration |

## Minimum Publishable Site

The first publishable version should include:

- Landing page
- Course catalog
- Learning paths
- Certification ladder
- Claude course
- Existing SurrealDB course index
- Contribution guide
- Governance page

## GitHub Pages Path

Phase 1 can publish from:

```text
main -> GitHub Actions -> GitHub Pages
```

## Content Sync Rule

Do not duplicate course content by hand.

The docs site should reference or ingest content from:

```text
academy/
courses/
```

## Future Platform Features

| Feature | Later Phase |
|---|---|
| progress tracking | Academy app |
| quizzes | LMS layer |
| certificates | credential service |
| paid cohorts | marketplace or commerce layer |
| videos | media publishing layer |
| labs-as-a-service | cloud lab runtime |
| sandbox environments | Agent Platform integration |

## Publish Decision

The Academy should be published when:

- At least one vendor track exists.
- At least one core platform track exists.
- Learning paths are documented.
- Certification ladder is documented.
- Governance and maintenance model exist.

This PR establishes that foundation.
