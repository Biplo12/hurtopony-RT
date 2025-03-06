import { getMoviesCategories } from "~/hooks/movies/useGetMoviesCategories";
import CategoryFilters from "./_components/category-filters";
import { getQueryClient } from "~/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import SortOptions from "./_components/sort-options";
import MoviesGrid from "./_components/movies-grid";
import { getMovies } from "~/hooks/movies/useGetMovies";
import { type SortOption } from "~/interfaces/IMovie";

type Params = Promise<{
  category?: string;
  q?: string;
  sortBy?: string;
  sortDirection?: string;
}>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Params;
}) {
  const resolvedParams = await searchParams;
  const queryClient = getQueryClient();

  const category = resolvedParams?.category?.toString();
  const selectedCategoryId = category ? Number(category) : null;

  const searchQuery = resolvedParams?.q?.toString() ?? "";
  const sortBy = (resolvedParams?.sortBy as SortOption) ?? "popularity";
  const sortDirection =
    (resolvedParams?.sortDirection as "ASC" | "DESC") ?? "DESC";

  await queryClient.prefetchQuery({
    queryKey: ["movies-categories"],
    queryFn: () => getMoviesCategories(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies(),
  });

  await queryClient.refetchQueries({
    queryKey: ["movies"],
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
