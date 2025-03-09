import React, { useState, useEffect } from "react";

const SKELETON_COUNT = 15;

const getSkeletonCount = (width: number): number => {
  if (width < 640) return 3;
  if (width < 1024) return 6;

  return SKELETON_COUNT;
};

const CategorySkeleton: React.FC = () => {
  const [skeletonCount, setSkeletonCount] = useState(SKELETON_COUNT);

  useEffect(() => {
    setSkeletonCount(getSkeletonCount(window.innerWidth));

    const handleResize = () => {
      setSkeletonCount(getSkeletonCount(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div
          key={index}
          className="h-8 w-24 animate-pulse rounded-full bg-secondary/30"
        />
      ))}
    </>
  );
};

export default CategorySkeleton;
