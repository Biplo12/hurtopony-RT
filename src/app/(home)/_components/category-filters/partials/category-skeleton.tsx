import React from "react";

const CategorySkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index}
          className="h-8 w-24 animate-pulse rounded-full bg-secondary/30"
        />
      ))}
    </>
  );
};

export default CategorySkeleton;
