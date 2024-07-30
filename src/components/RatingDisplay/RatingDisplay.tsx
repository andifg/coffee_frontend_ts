import "./RatingDisplay.scss";
import StarIcon from "@mui/icons-material/Star";
import theme from "../../theme";

interface RatingDisplayProps {
  rating: number;
  ratingCount?: number | undefined;
}

const RatingDisplay = (props: RatingDisplayProps) => {
  return (
    <div className="rating-display">
      <StarIcon
        className="rating-display-star-icon"
        sx={{ color: theme.palette.primary.main }}
      />
      <div
        className="rating-display-rating"
        style={{ color: theme.palette.primary.main }}
      >
        {Math.round((props.rating || 0) * 10) / 10}
      </div>
      {props.ratingCount != null && (
        <div className="rating-display-rating-count">({props.ratingCount})</div>
      )}
    </div>
  );
};

export { RatingDisplay };
