"use client";

import React from "react";
import { Pagination, PaginationContent } from "~/components/ui/pagination";
import { moviesStore } from "~/store/movies-store";
import PaginationItems from "./partials/pagination-items";

const PaginationControls: React.FC = () => {
  const { pagination } = moviesStore((state) => state);

  if (pagination.totalPages <= 1) return null;

  return (
    <Pagination className="py-6">
      <PaginationContent className="flex-wrap justify-center gap-1">
        <PaginationItems />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
