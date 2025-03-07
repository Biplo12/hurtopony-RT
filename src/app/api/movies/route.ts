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

  if (searchParams.get("sort_by")) {
    urlParams.set("sort_by", searchParams.get("sort_by") ?? "");
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
