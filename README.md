# Blog

Personal blog and portfolio website built with Next.js, featuring a rich text editor and Firebase integration.

## About

A personal blog platform with features for writing, publishing, and managing articles. Uses BlockNote for rich text editing and Firebase for backend services.

## Tech Stack

- Next.js 14
- React 18
- BlockNote (rich text editor)
- Firebase (authentication, database)
- Tailwind CSS
- Radix UI (headless components)
- Zustand (state management)
- Vercel Analytics
- next-themes (dark mode)

## Features

- **Rich Text Editor** - BlockNote-based WYSIWYG editor
- **Authentication** - Firebase Auth
- **Dark Mode** - System preference detection
- **Analytics** - Vercel Analytics integration
- **Responsive Design** - Mobile-friendly layout
- **Reading Time** - Estimated read time for articles

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Project Structure

```
app/                       # Next.js App Router
├── page.tsx              # Home page
├── blog/                 # Blog pages
├── layout.tsx            # Root layout
└── globals.css           # Global styles
components/               # Reusable components
├── editor/               # BlockNote editor
├── ui/                   # Radix UI components
└── blog/                 # Blog-related components
lib/                      # Utility functions
store/                    # Zustand stores
```

## Firebase Configuration

Configure Firebase in your environment variables or `lib/firebase.ts`.
