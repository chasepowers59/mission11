# Hilton's Online Bookstore

A full-stack web application for browsing and managing an online bookstore, built with React, TypeScript, Vite, ASP.NET Core, and SQLite.

## Project Structure

```
mission11/
├── backend/          # ASP.NET Core API
│   └── WebApplication1/
│       └── WebApplication1/
│           ├── Controllers/      # API endpoints
│           ├── Data/            # Entity models and DbContext
│           ├── Program.cs        # App configuration
│           └── Bookstore.sqlite  # SQLite database
│
└── frontend/        # React + TypeScript
    ├── src/
    │   ├── components/
    │   ├── types/     # TypeScript interfaces
    │   ├── App.tsx    # Main App component
    │   └── BookList.tsx  # Books listing component
    └── public/
```

## Features

- **Paginated Book Listing**: Display books with configurable page sizes (5, 10, 20)
- **Sorting**: Sort by Title, Author, or Price
- **Responsive Design**: Bootstrap-based responsive layout
- **RESTful API**: Clean API endpoints for book data retrieval
- **SQLite Database**: Pre-populated with sample book data

## Prerequisites

- .NET 10 SDK
- Node.js 18+
- npm or yarn

## Running the Application

### Backend (API Server)

```bash
cd backend/WebApplication1/WebApplication1
dotnet run
```

The API will be available at `http://localhost:5038`

### Frontend (React App)

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

- `GET /api/books` - List all books with pagination and sorting
  - Query parameters:
    - `pageNum` (default: 1) - Page number
    - `pageSize` (default: 5) - Items per page (max 100)
    - `sortBy` (default: \"Title\") - Sort field: \"Title\", \"Author\", or \"Price\"

Example:
```
http://localhost:5038/api/books?pageNum=1&pageSize=10&sortBy=Title
```

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Bootstrap 5
- **Backend**: ASP.NET Core 10, Entity Framework Core
- **Database**: SQLite
- **Build Tool**: Vite
- **Package Manager**: npm

## Assignment Details

IS 413 – Hilton Mission #11
Building a web app for an online bookstore with pagination and sorting capabilities.

      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
