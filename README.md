# Movie Explorer

An interactive web application for browsing and discovering movies, with advanced filtering, sorting, and pagination capabilities.

## Getting Started

### Requirements

- Node.js (version 20.x or newer)
- yarn
- The Movie Database API key (TMDB)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Biplo12/hurtopony-RT.git
cd movie-explorer
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add your TMDB API key:

```
THE_MOVIE_DB_API_KEY=your_api_key_here
```

You can obtain an API key by registering at [https://www.themoviedb.org/](https://www.themoviedb.org/) and going to your account settings.

4. Run the development server:

```bash
yarn dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Building for production

```bash
yarn build
yarn start
```

## Features

- Browse movies with detailed information
- Advanced filtering options (by category, year, runtime, rating)
- Search functionality
- Responsive design
- Pagination with preserved state on refresh
- Sort movies by different criteria

## Technologies

- Next.js
- React
- TypeScript
- Zustand (State Management)
- Tailwind CSS
- React Query
