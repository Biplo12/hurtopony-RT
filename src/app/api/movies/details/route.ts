import axios from "axios";
import { NextResponse } from "next/server";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { MOVIE_DB_API_KEY } from "~/constants/env";
import { type CrewMember, type Movie } from "~/interfaces/IMovie";

interface CreditsResponse {
  crew: CrewMember[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get("movieId");

  if (!movieId) {
    return NextResponse.json(
      { error: "Movie ID is required" },
      { status: 400 },
    );
  }

  try {
    const movieResponse = await axios.get<Movie>(
      `${MOVIE_DB_BASE_URL}/movie/${movieId}`,
      {
        params: {
          api_key: MOVIE_DB_API_KEY,
        },
      },
    );

    const creditsResponse = await axios.get<CreditsResponse>(
      `${MOVIE_DB_BASE_URL}/movie/${movieId}/credits`,
      {
        params: {
          api_key: MOVIE_DB_API_KEY,
        },
      },
    );

    const movieData = movieResponse.data;
    const { crew } = creditsResponse.data;

    const directors =
      crew?.filter((person: CrewMember) => person.job === "Director") || [];

    const writers =
      crew?.filter((person: CrewMember) =>
        ["Screenplay", "Writer", "Story"].includes(person.job),
      ) || [];

    return NextResponse.json({
      ...movieData,
      directors,
      writers,
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 },
    );
  }
}
