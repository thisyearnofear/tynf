<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project verification

Run these in order before committing:

```bash
npm install        # dependencies may not be present in a fresh checkout
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # Next.js production build
```

## Next.js 16 conventions used here

- `params` in `page.tsx` and `generateMetadata` is a `Promise`; `await` it before use.
- `metadataBase` is set in `src/app/layout.tsx`.
- `opengraph-image.tsx` and `apple-icon.tsx` generate dynamic images.
- Project detail routes live at `src/app/work/[id]/page.tsx`.

## Git workflow

- The active `gh` account for this repo is `thisyearnofear`. Use `gh auth switch --hostname github.com --user thisyearnofear` before `push` or `pr merge`.
- `main` is the default branch. Merged feature branches can be deleted after merge.
