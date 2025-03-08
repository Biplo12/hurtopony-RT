import React from "react";
import {
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "~/components/ui/pagination";
import { cn } from "~/lib/utils";
import usePageNumbers from "../../../hooks/usePageNumbers";

interface PaginationItemsProps {
  currentPage: number;
  totalPages: number;
  visiblePages: number;
  onPageChange: (page: number) => void;
  screenWidth: number;
}

const PaginationItems: React.FC<PaginationItemsProps> = ({
  currentPage,
  totalPages,
  visiblePages,
  onPageChange,
  screenWidth,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  const { pages, showFirstPage, showFirstEllipsis } = usePageNumbers({
    currentPage,
    totalPages,
    visiblePages,
  });

  return (
    <>
      <PaginationItem
        className={cn("md:flex", currentPage === 1 && "cursor-not-allowed")}
      >
        <PaginationPrevious
          onClick={handlePrevious}
          className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
        />
      </PaginationItem>

      {showFirstPage && screenWidth >= 480 && (
        <>
          <PaginationItem className="hidden xs:inline-flex">
            <PaginationLink onClick={() => handlePageClick(1)}>
              1
            </PaginationLink>
          </PaginationItem>

          {showFirstEllipsis && (
            <PaginationItem className="hidden sm:inline-flex">
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </>
      )}

      {pages.map((page: number) => (
        <PaginationItem key={page}>
          <PaginationLink
            isActive={page === currentPage}
            onClick={() => handlePageClick(page)}
            className={cn(
              page === currentPage &&
                "cursor-not-allowed bg-accent text-accent-foreground",
            )}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem
        className={cn(
          "md:flex",
          currentPage === totalPages && "cursor-not-allowed",
        )}
      >
        <PaginationNext
          onClick={handleNext}
          className={cn(
            currentPage === totalPages && "pointer-events-none opacity-50",
          )}
        />
      </PaginationItem>
    </>
  );
};

export default PaginationItems;
