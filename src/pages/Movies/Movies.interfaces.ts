export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface ApiResponse {
  Search: Movie[];
  Response: string;
  Error?: string;
  totalResults: string;
}
