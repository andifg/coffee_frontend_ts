import "./SlideToReload.scss";
import React, { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";
import { LoadingCircle } from "../LoadingCircle/LoadingCircle";

interface Props {
  functionToTriggerLoading: boolean;
  functionToTrigger: () => void;
  children: JSX.Element | JSX.Element[];
}

const SlideToReload = (props: Props): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const [loadStart, setLoadStart] = useState<EpochTimeStamp>(0);
  const [infoMessageShow, setInfoMessageShow] = useState<boolean>(false);

  const ref = React.useRef<HTMLDivElement>(null);
  const triggered = useRef<boolean>(false);

  const initialY = React.useRef<number>(0);
  const MAX = 110;
  const k = 0.3;

  function appr(x: number) {
    return MAX * (1 - Math.exp((-k * x) / MAX));
  }

  function handleTouchEnd() {
    if (ref.current) {
      ref.current.style.transform = "translateY(0)";
    }
    if (!show) return;

    const timePassed = Date.now() - loadStart;
    const wait = timePassed > 5000 ? 200 : 1000;
    console.log("Will wait for " + wait + " ms");

    setTimeout(() => {
      setShow(false);
    }, wait);

    triggered.current = false;
  }

  useEffect(() => {
    console.log("Show has changed " + show);
  }, [show]);

  function showLoadingSign() {
    if (triggered.current) return;
    console.log("SHOW INDICATOR " + triggered.current);
    setShow(true);
    setLoadStart(Date.now());
    triggered.current = true;
    props.functionToTrigger();
  }

  function handleTouchStart(startEvent: React.TouchEvent<HTMLDivElement>) {
    // get the initial Y position
    initialY.current = startEvent.touches[0].clientY;

    // console.log("Handle touch start " + initialY.current);
  }

  function handleTouchMove(moveEvent: React.TouchEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < 40) return;

    // console.log("Touch move: " + el.getBoundingClientRect().top );

    const SHOW_INDICATOR_THRESHOLD = 110;
    const SHOW_INFO_MESSAGE_THRESHOLD = 50;

    // get the current Y position
    const currentY = moveEvent.touches[0].clientY;

    // get the difference
    const dy = currentY - initialY.current;

    // update the element's transform
    el.style.transform = `translateY(${appr(dy)}px)`;

    // console.log(
    //   `dy: ${dy} show: ${show} recursiveLoading: ${recursiveLoading}`,
    // );

    if (dy > SHOW_INFO_MESSAGE_THRESHOLD) {
      setInfoMessageShow(true);
    }

    if (dy > SHOW_INDICATOR_THRESHOLD) {
      showLoadingSign();
    }
  }

  return (
    <>
      {infoMessageShow && !show && !props.functionToTriggerLoading && (
        <div className="slide-to-reload-info-message">
          {" "}
          <Typography
            variant="overline"
            sx={{ color: "primary.main", lineHeight: "2" }}
          >
            Slide down to reload
          </Typography>{" "}
          <SouthOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />{" "}
        </div>
      )}
      {((show && props.functionToTriggerLoading) || triggered.current) && (
        <LoadingCircle />
      )}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={ref}
        className="slide-to-reload"
        data-testid="slide-to-reload"
      >
        {props.children}
      </div>
    </>
  );
};

export default SlideToReload;
