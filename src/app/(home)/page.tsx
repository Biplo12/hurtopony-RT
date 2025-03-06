import { getMoviesCategories } from "~/hooks/movies/useGetMoviesCategories";
import CategoryFilters from "./_components/category-filters";
import { getQueryClient } from "~/lib/get-query-client";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import SortOptions from "./_components/sort-options";
import MoviesGrid from "./_components/movies-grid";
import { getMovies } from "~/hooks/movies/useGetMovies";
import { type SortOption } from "~/interfaces/IMovie";

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const queryClient = getQueryClient();
  const categoryId = searchParams.category
    ? Number(searchParams.category)
    : null;
  const searchQuery = searchParams.q?.toString() || "";
  const sortBy = (searchParams.sortBy as SortOption) || "popularity";
  const sortDirection =
    (searchParams.sortDirection as "ASC" | "DESC") || "DESC";

  await queryClient.prefetchQuery({
    queryKey: ["movies-categories"],
    queryFn: () => getMoviesCategories(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["movies", categoryId, searchQuery, sortBy, sortDirection],
    queryFn: () =>
      getMovies({
        selectedCategoryId: categoryId,
        searchQuery,
        sortOptions: {
          sortBy,
          sortDirection,
        },
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-background pb-20 text-foreground">
        <main className="container mx-auto px-4 pb-12 pt-24">
          <div className="mb-8 animate-slide-in text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
              Discover Movies
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Explore the world of cinema with our curated collection of films
            </p>
          </div>
          <CategoryFilters />
          <SortOptions />
          <MoviesGrid />
        </main>
      </div>
    </HydrationBoundary>
  );
}
