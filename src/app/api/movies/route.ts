import axios from "axios";
import { NextResponse } from "next/server";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { MOVIE_DB_API_KEY } from "~/constants/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = searchParams.get("page") ?? "1";

  const urlParams = new URLSearchParams();
  urlParams.set("api_key", MOVIE_DB_API_KEY);
  urlParams.set("page", page);
  urlParams.set("include_adult", "false");
  urlParams.set("include_video", "false");

  if (searchParams.get("sort_by")) {
    urlParams.set("sort_by", searchParams.get("sort_by") ?? "");
  }

  // Advanced filters parameters
  // Runtime filter
  if (searchParams.get("runtime.gte")) {
    urlParams.set("with_runtime.gte", searchParams.get("runtime.gte") ?? "");
  }

  if (searchParams.get("runtime.lte")) {
    urlParams.set("with_runtime.lte", searchParams.get("runtime.lte") ?? "");
  }

  // Release date filter
  if (searchParams.get("release_date.gte")) {
    urlParams.set(
      "primary_release_date.gte",
      searchParams.get("release_date.gte") ?? "",
    );
  }

  if (searchParams.get("release_date.lte")) {
    urlParams.set(
      "primary_release_date.lte",
      searchParams.get("release_date.lte") ?? "",
    );
  }

  // Rating filter
  if (searchParams.get("vote_average.gte")) {
    urlParams.set(
      "vote_average.gte",
      searchParams.get("vote_average.gte") ?? "",
    );
  }

  if (searchParams.get("vote_average.lte")) {
    urlParams.set(
      "vote_average.lte",
      searchParams.get("vote_average.lte") ?? "",
    );
  }

  const endpoint = query
    ? `${MOVIE_DB_BASE_URL}/search/movie`
    : `${MOVIE_DB_BASE_URL}/discover/movie`;

  if (query) {
    urlParams.set("query", query);
  } else {
    if (searchParams.get("with_genres")) {
      urlParams.set("with_genres", searchParams.get("with_genres") ?? "");
    }
  }

  const response = await axios.get(endpoint, {
    params: urlParams,
  });

  return NextResponse.json(response.data);
}
