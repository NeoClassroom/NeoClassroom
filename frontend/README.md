# Classroom Frontend

This frontend uses a clean Vite + React + TypeScript structure with a simple app shell and page layout.

## Structure

```text
src/
  App.tsx
  App.css
  index.css
  components/
    Layout.tsx
  pages/
    HomePage.tsx
```

## Scripts

- `npm install`
- `npm run dev` — starts Vite, Storybook on port 6007, and Vitest in watch mode together
- `npm test` — runs the test suite once
- `npm run storybook` — starts Storybook by itself
- `npm run build`
- `npm run lint`

Git commits run `npm test` through the Husky pre-commit hook.

## Notes

The project was reorganized to match a standard React application layout and the root TypeScript config was fixed so Vite can build successfully.
