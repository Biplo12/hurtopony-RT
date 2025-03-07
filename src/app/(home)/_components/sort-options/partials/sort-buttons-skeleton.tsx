import { ListFilter } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

const SortButtonsSkeleton: React.FC = () => {
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
};

export default SortButtonsSkeleton;
