# Recipe Management App 🍳

A modern recipe management application built with Next.js and TypeScript, featuring user authentication, recipe organization, and a responsive UI.

## ✨ Features

- **User Authentication**
  - Secure login and signup
  - Protected dashboard routes
  - Session management

- **Recipe Management**
  - Browse recipe categories
  - Save favorite recipes
  - Detailed recipe views
  - Dynamic recipe search

- **Modern UI/UX**
  - Responsive design
  - Tailwind CSS styling
  - Custom UI components
  - Intuitive navigation

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm/yarn/pnpm
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

## 📁 Project Structure

```
/public
  ├── assets/
  └── icons/
/src
  ├── app/
  │   ├── (Auth)/
  │   ├── (Protected)/
  │   ├── api/
  │   └── lib/
  ├── components/
  │   ├── ui/
  │   └── shared/
  └── types/
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run code linting

## 💻 Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Custom UI components
- **Linting**: ESLint
- **CSS Processing**: PostCSS

## 🔐 Authentication

- Access login: `/login`
- Create account: `/signup`
- Protected dashboard: `/dashboard`
  - Categories: `/dashboard/categories`
  - Favorites: `/dashboard/favorites`
  - Recipe details: `/dashboard/recipes/[id]`

## 👋 Thanks for checking out the project!

Happy coding! 🚀
