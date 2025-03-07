"use client";

import React from "react";
import { ListFilter } from "lucide-react";
import SortButtons from "./partials/sort-buttons";
import DirectionButton from "./partials/direction-button";
import SortButtonsSkeleton from "./partials/sort-buttons-skeleton";

interface SortOptionsProps {
  isParamsLoading?: boolean;
}

const SortOptions: React.FC<SortOptionsProps> = ({
  isParamsLoading = false,
}) => {
  if (isParamsLoading) {
    return <SortButtonsSkeleton />;
  }

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center text-xs text-muted-foreground sm:text-sm">
          <ListFilter className="mr-1 h-3 w-3 sm:h-4 sm:w-4" /> Sort by:
        </span>
        <SortButtons />
      </div>

      <DirectionButton />
    </div>
  );
};

export default SortOptions;
