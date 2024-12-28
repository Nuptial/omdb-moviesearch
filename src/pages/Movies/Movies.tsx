import React, { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import {
  Box,
  Container,
  TextField,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Pagination,
} from "@mui/material";
import { setPage, setYear, setQuery } from "../../slices/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import MovieCard from "../../components/MovieCard/MovieCard";
import { ApiResponse, Movie } from "./Movies.interfaces";

const OMDB_API_KEY = "2aaab96c";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

const itemsPerPage = 10;

const Movies: React.FC = () => {
  const query = useSelector((state: RootState) => state.appStore.query);
  const page = useSelector((state: RootState) => state.appStore.page);
  const year = useSelector((state: RootState) => state.appStore.year);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<string>("");
  const dispatch = useDispatch();

  const fetchMovies = async (
    searchQuery: string,
    searchYear: string,
    page: string
  ): Promise<void> => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
          searchQuery
        )}${searchYear ? `&y=${searchYear}` : ""}&page=${page}`
      );
      const data: ApiResponse = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setTotalResults(data.totalResults);
      } else {
        setError(data.Error || "Unable to fetch movies");
        setMovies([]);
      }
    } catch {
      setError("An error occurred while fetching movies");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchMovies = useMemo(
    () =>
      debounce((searchQuery: string, searchYear: string, page: string) => {
        fetchMovies(searchQuery, searchYear, page);
      }, 500),
    []
  );

  useEffect(() => {
    debouncedFetchMovies(query, year, page);
    return () => debouncedFetchMovies.cancel();
  }, [query, year, debouncedFetchMovies, page]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setQuery(e.target.value));

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setYear(e.target.value));

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) =>
    dispatch(setPage(value));

  const renderLoading = () => (
    <Grid container justifyContent="center" sx={{ marginTop: "2rem" }}>
      <CircularProgress sx={{ color: "#ff9800" }} />
    </Grid>
  );

  const renderError = () => (
    <Alert severity="error" sx={{ marginTop: "2rem" }}>
      {error}
    </Alert>
  );

  const renderMovies = () => (
    <>
      <Grid container spacing={4} sx={{ marginTop: "2rem" }}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} key={movie.imdbID}>
            <MovieCard
              imdbID={movie.imdbID}
              Title={movie.Title}
              Year={movie.Year}
              Poster={movie.Poster}
            />
          </Grid>
        ))}
      </Grid>

      {Number(totalResults) > movies.length && (
        <Grid container justifyContent="center" sx={{ marginTop: "2rem" }}>
          <Pagination
            count={Math.ceil(Number(totalResults) / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "white",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#ff9800",
              },
            }}
          />
        </Grid>
      )}
    </>
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1e1e1e, #424242)",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            marginBottom: "2rem",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          OMDb Movie Search
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              fullWidth
              placeholder="Search for a movie"
              variant="outlined"
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setPage(1));
                handleQueryChange(e);
              }}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              placeholder="Year"
              variant="outlined"
              value={year}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setPage(1));
                handleYearChange(e);
              }}
              type="number"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            />
          </Grid>
        </Grid>

        {loading && renderLoading()}
        {error && renderError()}
        {!loading && !error && renderMovies()}
      </Container>
    </Box>
  );
};

export default Movies;
