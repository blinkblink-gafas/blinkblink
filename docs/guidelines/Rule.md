# Rules

The rules every change follows, whoever makes it — a developer or an AI
assistant. **"Must"** is a hard rule; **"prefer"** is the default unless
there is a stated reason not to.

## 1. Checklist — before making changes

- [ ] Read `Memory.md` for the current status and known issues.
- [ ] Find the task in `Task.md`. If it isn't there, add it first.
- [ ] If it changes what the product does, check it against `PRD.md`.
- [ ] If it changes anything visible, check `design.md`.
- [ ] Read the files you are about to change, and one similar existing
      file, so the new code matches what is there.
- [ ] Start from an up-to-date `main` on a new branch (`feat/…`, `fix/…`,
      `docs/…`). Never commit straight to `main`.
- [ ] If the request is unclear or conflicts with these documents, ask
      before building.

## 2. Checklist — before calling a change done

- [ ] `yarn typecheck` passes with no errors.
- [ ] `yarn test` passes; new logic in `lib/` or `store/` has tests.
- [ ] Checked in the browser at desktop width **and** 375px (phone), with no
      sideways scrolling.
- [ ] No errors in the browser console.
- [ ] `yarn build` passes (for anything beyond a text or style tweak).
- [ ] No user-facing text typed into a component — it is in
      `locales/en.json`.
- [ ] `Task.md` and `Memory.md` are updated.
- [ ] README updated if setup, structure or a documented behavior changed.
- [ ] Reported honestly: what was done, what was not, what is a placeholder.

## 3. General principles

1. **`design.md` is the source of truth for how things look.** Don't
   invent a new look for a page; extend the existing one.
2. **Do what was asked, no more.** No unrequested features, refactors or
   dependencies. Suggest them instead.
3. **Reuse before you build.** Look in `components/ui`,
   `components/sections` and `lib/` first.
4. **One source of truth for each thing.** Products → `lib/catalog.ts`.
   Text → `locales/en.json`. Site photos → `lib/images.ts`. Store policies →
   `lib/storeConfig.ts`. Colors → `styles/globals.css`.
5. **Only show what works.** No dead links, no buttons that do nothing, no
   invented offers, prices or policies. Placeholders must be labelled as
   placeholders in the code and in `Memory.md`.
6. **Mobile is not an afterthought.** Every page works on a phone.
7. **Accessible by default.** Everything works with a keyboard and has a
   label.
8. **Small, reviewable changes.** One feature or fix per branch.

## 4. Coding standards

### TypeScript

- **Must** keep strict mode clean. No `any`; no `// @ts-ignore`.
- **Must** put shared types in `types/`. Component prop types live in the
  component file and are exported as `XxxProps`.
- Array and record lookups can be `undefined` (`noUncheckedIndexedAccess`) —
  handle it, don't assert it away without a reason.

### Components

- Function components, one per file, default export, `PascalCase.tsx`.
- **Must not** contain user-facing text. Use `useTranslation()`; use
  `formatTranslation()` for `{placeholders}` and `formatCount()` for
  singular/plural.
- **Must** use `next/image` for images and `next/link` for internal links.
- **Must** use the `Button` component for buttons that look like buttons.
- Join class names with `cn()`.
- Keep logic that can be tested out of components — put it in `lib/`.

### Styling

- Tailwind utility classes only; no new CSS files, no inline `style` except
  for values computed at runtime (a swatch color, a progress width).
- **Must** use the color tokens (`bg-primary`, `text-ink`, `bg-accent-pink`
  …). No hex codes in components.
- To override `Section`'s default vertical padding, pass side-specific
  classes (`pt-*` / `pb-*`) at every breakpoint you override. A plain `py-0`
  can lose to the default.
- Global classes are rare and live in `styles/globals.css` with a comment
  explaining why (`photo-cutout`, `range-dual`).

### Data and state

- **Must** read products only through `lib/catalog.ts` (server) or
  `productsApi` (browser). Never import `mockData` in a page or component —
  the one exception is `getMockCategories` until a categories source exists.
- Listing state (filters, sort, page, search) lives in the **URL** via
  `useUrlFilters()`. Any filter change resets `page` to 1.
- Cart and wishlist live in Redux. New client endpoints are added with
  `apiSlice.injectEndpoints`, not a new `createApi`.
- Anything read from `localStorage` is validated before use and restored
  after mount, never during render.
- Prices are always shown with `formatPrice()`.

### Accessibility

- Icon-only buttons **must** have an `aria-label`. Decorative icons and
  images get `aria-hidden="true"` or `alt=""`.
- Toggles use `aria-pressed`; tabs, dialogs and progress bars use their
  ARIA roles.
- Form fields have a visible label (or `sr-only` label) and show errors in
  text tied to the field with `aria-describedby`.
- Dialogs and drawers close on Escape and on backdrop click, and lock page
  scroll while open.
- Don't remove the visible focus outline.

### Comments

- Comment the **why**, not the what. A short doc comment on each exported
  function and component.
- No commented-out code. No `TODO` without an entry in `Task.md`.

### Tests

- Logic in `lib/` and `store/` gets unit tests in a `*.test.ts` file next
  to it.
- A bug fix comes with a test that would have caught it, where the bug is
  in testable logic.

## 5. Structure rules

| I'm adding… | It goes in… |
|---|---|
| A new page | `pages/` — includes `<Seo>`; uses `getStaticProps` when it shows catalog data |
| A page-sized block | `components/sections/` |
| A small reusable piece | `components/ui/`, exported from `components/ui/index.ts` |
| Site-wide chrome | `components/layout/` |
| Logic with no JSX | `lib/` |
| A shared type | `types/` |
| Text | `locales/en.json` **and** `types/locales.ts` |
| A photo that isn't a product photo | `lib/images.ts` (file in `public/images/`) |
| A store policy or setting | `lib/storeConfig.ts` |
| A frame or lens color | The product in the catalog **and** a swatch in `lib/colors.ts` |
| A footer or nav link | Only once the page it points to exists |

Import with the `@/` aliases (`@/components/…`, `@/lib/…`). Imports only go
downwards: pages → sections → ui → lib / store / types.

## 6. Dependencies

- **Must** ask before adding a package. Say what it's for and why existing
  code can't do it.
- Icons come from `lucide-react` only. Animation from `framer-motion` only.

## 7. Content and images

- Tone: short, confident, playful. No filler.
- **Must not** show other brands' logos or names in photos or text.
- Stock photos must be free for commercial use (currently Unsplash) and are
  placeholders until real photography exists.
- **Only use photos blink blink owns or is licensed to use.** Product
  photos are the brand's own, in `public/images/products/`.
- Every meaningful image has `alt` text describing what it shows.

## 8. Git

- Branch from `main`; merge back through a pull request.
- Commit messages: `type: summary` — `feat`, `fix`, `docs`, `refactor`,
  `test`, `chore`. The body says what changed and why.
- Commit or push only when asked. Never force-push `main`.
- Don't commit `.env*`, `.next/`, `node_modules/` or log files.

## 9. Keeping these documents true

- A change to how the project works updates the matching document in the
  same branch: behavior → `PRD.md`, structure → `Architecture.md`, look →
  `design.md`, process → this file.
- If code and documents disagree, stop and resolve it — fix the code, or
  agree to change the rule. Don't leave both.
