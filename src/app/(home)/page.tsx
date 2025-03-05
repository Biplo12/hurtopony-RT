import { getMoviesCategories } from "~/hooks/movies/get-movies-categories";
import CategoryFilters from "./_components/category-filters";
import { getQueryClient } from "~/lib/get-query-client";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["movies-categories"],
    queryFn: () => getMoviesCategories(),
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
        </main>
      </div>
    </HydrationBoundary>
  );
}
