import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const OMDB_API_KEY = "2aaab96c";
const OMDB_BASE_URL = "https://www.omdbapi.com/";

interface Movie {
  Title: string;
  Year: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
  Poster: string;
}

const MovieDetail: React.FC = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { movieId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${movieId}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Unable to fetch movie details");
        }
      } catch {
        setError("An error occurred while fetching movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const renderLoading = () => (
    <Container
      sx={{
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "#ff9800" }} />
    </Container>
  );

  const renderError = () => (
    <Container
      sx={{
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#ff5722",
          color: "#fff",
          marginBottom: "2rem",
          "&:hover": { backgroundColor: "#ff784e" },
        }}
        onClick={() => navigate("/")}
      >
        Back to Homepage
      </Button>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  const renderMovieDetails = () => (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1e1e1e, #424242)",
        color: "#fff",
        minHeight: "100vh",
        padding: "2rem 0",
      }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff5722",
            color: "#fff",
            marginBottom: "2rem",
            "&:hover": { backgroundColor: "#ff784e" },
          }}
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </Button>
        <Card
          sx={{
            maxWidth: "800px",
            margin: "auto",
            background: "#333",
            color: "#fff",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ padding: "2rem" }}>
            <Box
              component="img"
              src={
                movie?.Poster !== "N/A"
                  ? movie?.Poster
                  : "https://via.placeholder.com/300x450?text=No+Image+Available"
              }
              alt={movie?.Title}
              sx={{
                width: "100%",
                maxWidth: "300px",
                margin: "auto",
                display: "block",
                borderRadius: "8px",
                marginBottom: "1.5rem",
              }}
            />
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", fontFamily: "Roboto, sans-serif" }}
            >
              {movie?.Title} ({movie?.Year})
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#ff9800",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              IMDb Rating: {movie?.imdbRating}/10
            </Typography>
            <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
              <Typography variant="body1" gutterBottom>
                <strong>Duration:</strong> {movie?.Runtime}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Genre:</strong> {movie?.Genre}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Director:</strong> {movie?.Director}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Cast:</strong> {movie?.Actors}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Plot:</strong> {movie?.Plot}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );

  if (loading) return renderLoading();
  if (error) return renderError();
  if (!movie) return null;
  return renderMovieDetails();
};

export default MovieDetail;
