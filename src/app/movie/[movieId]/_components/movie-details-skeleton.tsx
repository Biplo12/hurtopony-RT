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
      <div className="relative h-[50vh] w-full overflow-hidden md:h-[70vh]">
        <Skeleton className="h-full w-full" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto flex flex-col items-center space-y-6 p-6 md:container md:flex-row md:items-end md:space-x-8 md:space-y-0 md:p-8">
          {/* Poster Skeleton */}
          <div className="neo-card relative w-48 flex-shrink-0 translate-y-12 overflow-hidden rounded-xl shadow-2xl md:w-64 md:translate-y-16">
            <Skeleton className="aspect-[2/3] w-full" />
          </div>

          {/* Movie Info Skeleton */}
          <div className="w-full animate-fade-in md:w-auto md:pb-8">
            <Skeleton className="mb-4 h-8 w-64 md:h-10 md:w-96" />
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section Skeleton */}
      <div className="container mx-auto px-6 pb-16 pt-24 md:pt-32">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <Info className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Overview</h2>
            </div>
            <div className="rounded-xl px-2">
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
