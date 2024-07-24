import "./Story.scss";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import theme from "../../theme";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Rating } from "../../client";
import { Typography } from "@mui/material";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";

interface Props {
  close: () => void;
  rating: Rating;
}

const Story = (props: Props): JSX.Element => {
  const [progress, setProgress] = useState<number>(0);
  const isMountedRef = useRef(true);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchImage = async () => {
    setLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve("resolved");
      }, 1000);
    });
  };

  useEffect(() => {
    console.log("use effect");
    document.body.style.overflow = "hidden";

    const fetchAndDisplayStory = async () => {
      await fetchImage();

      while (isMountedRef.current) {
        await new Promise((resolve) => setTimeout(resolve, 20));
        console.log("insiede loop");
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 0.5;
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
      console.log("unmount");
      document.body.style.overflow = "auto";
    };
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

            <div className="story-user-information-wrapper">
              <div className="story-user-avatar">
                <UserAvatar given_name={props.rating.user_name} />
              </div>
              <div className="story-user-name">
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ color: "text.primary" }}
                >
                  {props.rating.user_name}
                </Typography>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="story-loading-circle-wrapper">
            <LoadingCircle />
            </div>
          ) : (
            <img
              src="./rating-image.jpg"
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
