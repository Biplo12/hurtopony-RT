"use client";

import React from "react";
import { ListFilter } from "lucide-react";
import SortButtons from "./partials/sort-buttons";
import DirectionButton from "./partials/direction-button";

const SortOptions: React.FC = () => {
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
