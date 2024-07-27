import "./Story.scss";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import theme from "../../theme";
import { Rating } from "../../client";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";
import { useLoadImageUrl } from "../useLoadImageUrl/useLoadImageUrl";
import { UserPostHeader } from "../UserPostHeader/UserPostHeader";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  close: () => void;
  rating: Rating;
}

const Story = (props: Props): JSX.Element => {
  const [progress, setProgress] = useState<number>(0);
  const isMountedRef = useRef(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageURL, fetchImageAndCreateUrl, _] = useLoadImageUrl(
    `/api/v1/coffee-drink/${props.rating._id}/image`,
    setLoading,
    false,
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const fetchAndDisplayStory = async () => {
      setLoading(true);
      await fetchImageAndCreateUrl();

      while (isMountedRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 0.3;
          if (nextProgress >= 100) {
            props.close();
            document.body.style.overflow = "auto";
            isMountedRef.current = false; // Stop the loop
          }
          return nextProgress <= 100 ? nextProgress : 100;
        });
      }
    };

    fetchAndDisplayStory();
    return () => {
      document.body.style.overflow = "auto";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {createPortal(
        <div
          className="story-wrapper"
          style={{ backgroundColor: theme.palette.secondary.light }}
        >
          <div className="story-content-wrapper">
            <div
              className="story-progress-bar"
              style={{ backgroundColor: theme.palette.secondary.main }}
            >
              <div
                className="story-progress-bar-percentage"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <UserPostHeader
              rightSideContent={
                <IconButton onClick={props.close} aria-label="close storry">
                  <CloseIcon sx={{ color: "text.primary" }} />
                </IconButton>
              }
              username={props.rating.user_name}
              uuid={props.rating._id}
            />
          </div>
          {loading ? (
            <div className="story-loading-circle-wrapper">
              <LoadingCircle />
            </div>
          ) : (
            <img
              src={imageURL || "./rating-image.jpg"}
              alt="avatar"
              className="story-image"
            />
          )}
        </div>,
        document.body,
      )}
    </>
  );
};

export { Story };
