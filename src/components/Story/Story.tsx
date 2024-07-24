import "./Story.scss";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import theme from "../../theme";
import UserAvatar from "../UserAvatar/UserAvatar";
import { Rating } from "../../client";
import { Typography } from "@mui/material";

interface Props {
  close: () => void;
  rating: Rating;
}

const Story = (props: Props): JSX.Element => {
  const [progress, setProgress] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(true);

  const test = async () => {
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

    let interval;

    const bubu = async () => {
      await test();

      interval = setInterval(() => {
        console.log("set intervall ");
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 0.5;
          console.log(nextProgress)
          if (nextProgress >= 100) {
            props.close();
            document.body.style.overflow = "auto";
            clearInterval(interval);
          }
          return nextProgress <= 100 ? nextProgress : 100;
        });
      }, 20);
    };

    bubu();

    return () => {
      console.log("unmount");
      // console.log(intervall)
      clearInterval(interval);
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

          <img src="./rating-image.jpg" alt="avatar" className="story-image" />
        </div>,
        document.body,
      )}
    </>
  );
};

export { Story };
