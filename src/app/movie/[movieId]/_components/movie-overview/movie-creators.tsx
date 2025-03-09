import { PenTool, Film } from "lucide-react";
import { type Movie } from "~/interfaces/IMovie";

interface MovieCreatorsProps {
  movie: Movie;
}

const MovieCreators: React.FC<MovieCreatorsProps> = ({ movie }) => {
  return (
    <div className="grid max-w-fit grid-cols-1 gap-12 xs:grid-cols-2">
      {movie.directors.length > 0 && (
        <div>
          <div className="mb-2 flex items-center space-x-2">
            <Film className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">
              Director{movie.directors.length > 1 ? "s" : ""}
            </h2>
          </div>
          <div className="text-base text-muted-foreground md:text-lg">
            {movie.directors.map((director, index) => (
              <span key={director.id}>
                {director.name}
                {index < movie.directors.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      )}

      {movie.writers.length > 0 && (
        <div>
          <div className="mb-2 flex items-center space-x-2">
            <PenTool className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">
              Writer{movie.writers.length > 1 ? "s" : ""}
            </h2>
          </div>
          <div className="text-base text-muted-foreground md:text-lg">
            {movie.writers.map((writer, index) => (
              <span key={writer.id}>
                {writer.name}
                {index < movie.writers.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCreators;
