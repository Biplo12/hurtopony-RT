import { useMemo } from "react";

interface UsePageNumbersProps {
  currentPage: number;
  totalPages: number;
  visiblePages: number;
}

interface PageNumbersResult {
  pages: number[];
  showFirstPage: boolean;
  showFirstEllipsis: boolean;
}

const usePageNumbers = ({
  currentPage,
  totalPages,
  visiblePages,
}: UsePageNumbersProps): PageNumbersResult => {
  return useMemo(() => {
    const halfVisible = Math.floor(visiblePages / 2);
    const startPage = Math.max(1, currentPage - halfVisible);
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    const adjustedStartPage = Math.max(1, endPage - visiblePages + 1);

    const pages: number[] = [];
    for (let i = adjustedStartPage; i <= endPage; i++) {
      pages.push(i);
    }

    const showFirstPage = adjustedStartPage > 1;
    const showFirstEllipsis = adjustedStartPage > 2;

    return {
      pages,
      showFirstPage,
      showFirstEllipsis,
    };
  }, [currentPage, totalPages, visiblePages]);
};

export default usePageNumbers;
