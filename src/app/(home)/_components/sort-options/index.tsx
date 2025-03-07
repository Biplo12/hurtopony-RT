"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ListFilter } from "lucide-react";
import SortButtons from "./partials/sort-buttons";
import DirectionButton from "./partials/direction-button";
import { moviesStore } from "~/store/movies-store";
import { type SortOption } from "~/interfaces/IMovie";
import { Skeleton } from "~/components/ui/skeleton";

interface SortOptionsProps {
  isParamsLoading?: boolean;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  isParamsLoading = false,
}) => {
  const searchParams = useSearchParams();
  const { setSortOptions } = moviesStore((state) => state);

  useEffect(() => {
    const sortBy = searchParams.get("sortBy") as SortOption;
    const sortDirection = searchParams.get("sortDirection") as "ASC" | "DESC";

    if (sortBy && sortDirection) {
      setSortOptions({ sortBy, sortDirection });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isParamsLoading) {
    return (
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 flex items-center text-sm text-muted-foreground">
            <ListFilter className="mr-1 h-4 w-4" /> Sort by:
          </span>
          <Skeleton className="h-8 w-64 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 flex items-center text-sm text-muted-foreground">
          <ListFilter className="mr-1 h-4 w-4" /> Sort by:
        </span>
        <SortButtons />
      </div>

      <DirectionButton />
    </div>
  );
};

export default SortOptions;
