import React from "react";
import { Skeleton } from "~/components/ui/skeleton";

const SKELETON_COUNT = 10;

const MovieCardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl">
          <Skeleton className="skeleton aspect-[2/3]" />
          <div className="space-y-2 p-4">
            <Skeleton className="skeleton h-5 w-3/4" />
            <Skeleton className="skeleton h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCardSkeleton;
