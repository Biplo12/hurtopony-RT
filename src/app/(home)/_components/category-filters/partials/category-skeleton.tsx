import React from "react";

const SKELETON_COUNT = 15;

const CategorySkeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div
          key={index}
          className="h-8 w-24 animate-pulse rounded-full bg-secondary/30"
        />
      ))}
    </>
  );
};

export default CategorySkeleton;
