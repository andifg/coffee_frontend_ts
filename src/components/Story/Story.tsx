import "./Story.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import theme from "../../theme";

interface Props {
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

const Story = (props: Props): JSX.Element => {

  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {

    document.body.style.overflow = "hidden";

    if (progress == 100){
      console.log("Abort")
      props.setTrigger(false)
      document.body.style.overflow = "auto";
    }

    const interval = setInterval(() => {
      console.log("set intervall ")
      setProgress(prevProgress => {
        const nextProgress = prevProgress + 10;
        if (nextProgress === 100) {
          props.setTrigger(false);
          document.body.style.overflow = "auto";
          clearInterval(interval);
        }
        return nextProgress <= 100 ? nextProgress : 100;
      });
    }, 1000); // Update every 1 second


            //Clearing the interval
    return () =>{
      clearInterval(interval)
      setProgress(0)
    }

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
                <div className="story-progress-bar-percentage" style={{width: `${progress}%` }}></div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export { Story };
