import { Film } from "lucide-react";
import { cn } from "~/lib/utils";

interface MoviePlaceholderProps {
  title: string;
  className?: string;
}

const MoviePlaceholder: React.FC<MoviePlaceholderProps> = ({
  title,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-secondary/30",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 p-4 text-center">
        <Film className="h-12 w-12 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{title}</span>
      </div>
    </div>
  );
};

export default MoviePlaceholder;
