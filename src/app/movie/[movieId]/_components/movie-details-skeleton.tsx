import Link from "next/link";
import { Skeleton } from "~/components/ui/skeleton";
import { ArrowLeft, Info } from "lucide-react";

const MovieDetailsSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Link
        href="/"
        className="fixed left-6 top-20 z-50 rounded-full border border-white/10 bg-background/30 p-2 backdrop-blur-md transition-colors hover:bg-background/50"
        aria-label="Back to home"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      {/* Hero Section Skeleton */}
      <div className="relative h-[60vh] w-full overflow-hidden sm:h-[65vh] md:h-[70vh] lg:h-[75vh]">
        <Skeleton className="h-full w-full" />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col px-4 pb-6 md:container sm:pb-10 md:mx-auto md:flex-row md:items-end md:gap-8 md:px-6 md:pb-12 lg:pb-16">
          {/* Poster Skeleton */}
          <div className="neo-card relative mx-auto w-36 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl sm:w-44 md:mx-0 md:w-56 lg:w-64">
            <Skeleton className="aspect-[2/3] w-full" />
          </div>

          {/* Movie Info Skeleton */}
          <div className="flex w-full animate-fade-in flex-col items-center gap-4 pt-4 text-center sm:pt-6 md:w-auto md:items-start md:pb-4 md:pt-0 md:text-left lg:pb-8">
            <Skeleton className="h-8 w-64 sm:h-9 md:h-10 md:w-96" />
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="mt-1 flex flex-wrap justify-center gap-2 md:justify-start">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section Skeleton */}
      <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:pt-24">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card flex flex-col gap-4 rounded-xl p-6">
            <div className="flex items-center space-x-2">
              <Info className="h-5 w-5 text-accent" />
              <h2 className="text-xl font-semibold">Overview</h2>
            </div>
            <div className="rounded-xl">
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-full" />
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsSkeleton;
