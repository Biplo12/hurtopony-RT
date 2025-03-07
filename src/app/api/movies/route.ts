import axios from "axios";
import { NextResponse } from "next/server";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { MOVIE_DB_API_KEY } from "~/constants/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const urlParams = new URLSearchParams();

  if (searchParams.get("with_genres")) {
    urlParams.set("with_genres", searchParams.get("with_genres") ?? "");
  }

  if (searchParams.get("query")) {
    urlParams.set("query", searchParams.get("query") ?? "");
  }

  if (searchParams.get("sort_by")) {
    urlParams.set("sort_by", searchParams.get("sort_by") ?? "");
  }

  if (searchParams.get("sort_direction")) {
    urlParams.set("sort_direction", searchParams.get("sort_direction") ?? "");
  }

  urlParams.set("api_key", MOVIE_DB_API_KEY);

  console.log(urlParams.toString());

  const response = await axios.get(`${MOVIE_DB_BASE_URL}/discover/movie`, {
    params: urlParams,
  });

  return NextResponse.json(response.data);
}
