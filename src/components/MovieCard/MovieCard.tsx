import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  imdbID,
  Title,
  Year,
  Poster,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#333",
        color: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform .5s, box-shadow .5s",
        "&:hover": {
          transform: "scale(1.02) perspective(0px)",
          boxShadow: "0 10px 10px #ff9800",
        },
      }}
      onClick={() => navigate(`/movie/${imdbID}`)}
    >
      <CardMedia
        component="img"
        height="300"
        image={
          Poster !== "N/A"
            ? Poster
            : "https://via.placeholder.com/300x450?text=No+Image+Available"
        }
        alt={Title || "No title available"}
      />
      <CardContent
        sx={{
          flex: "1 0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {Title || "Unknown Title"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#ff9800", fontWeight: "bold" }}
        >
          {Year || "Year not available"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
