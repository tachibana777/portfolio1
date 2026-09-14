# Kritsada Hongpatsa — Security Portfolio

A responsive cybersecurity and penetration-testing portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm run start
```

## Structure

```text
app/                    Routes and global styles
components/
  home/                 Home-page sections
  layout/               Shared header, footer, and page shell
  projects/             Project-specific components
  ui/                   Reusable presentation components
lib/                    Typed content data and shared types
public/                 Runtime images and resume
docs/design/            Original design references
```

Portfolio content is maintained in `lib/data.ts`. Shared content types live in `lib/types.ts`.
