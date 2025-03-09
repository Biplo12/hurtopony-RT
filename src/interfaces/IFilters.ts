interface IFilters {
  runtime: { min: number; max: number };
  releaseDate: { min: string; max: string };
  rating: { min: number; max: number };
}

export default IFilters;
