import React, { useEffect, useRef, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "../../../theme";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/index";
import { incrementRealoadCount } from "../../../redux/GeneralConfigReducer";
import { setRecursiveLoading } from "../../../redux/GeneralConfigReducer";
import { Typography } from "@mui/material";
import SouthOutlinedIcon from "@mui/icons-material/SouthOutlined";

interface Props {
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

  const dispatch = useDispatch<AppDispatch>();

  const recursiveLoading = useSelector(
    (state: RootState) => state.generalConfig.recursiveLoading,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
  });

  function appr(x: number) {
    return MAX * (1 - Math.exp((-k * x) / MAX));
  }

  function handleTouchEnd() {
    if (!show) return;

    console.log("TOUCH END");
    const el = ref.current;
    if (!el) return;

    const timePassed = Date.now() - loadStart;
    const wait = timePassed > 5000 ? 200 : 1500;
    console.log("Will wait for " + wait + " ms");

    el.style.transform = "translateY(0)";

    setTimeout(() => {
      setShow(false);
    }, wait);

    // setInfoMessageShow(false);

    triggered.current = false;
  }

  useEffect(() => {
    console.log("Show has changed " + show);
  }, [show]);

  function showLoadingSign() {
    if (triggered.current) return;
    console.log("SHOW INDICATOR " + triggered.current);
    console.log(recursiveLoading);
    setShow(true);
    setLoadStart(Date.now());
    triggered.current = true;
    dispatch(incrementRealoadCount());
    dispatch(setRecursiveLoading(true));
    console.log(recursiveLoading);
    console.log("Show indicator after set" + show);
  }

  function handleTouchStart(startEvent: React.TouchEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    // get the initial Y position
    initialY.current = startEvent.touches[0].clientY;

    // console.log("Handle touch start " + initialY.current);
  }

  function handleTouchMove(moveEvent: React.TouchEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    if (initialY.current > 110) return;

    const SHOW_INDICATOR_THRESHOLD = 100;
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
      {infoMessageShow && !show && !recursiveLoading && (
        <div className="slide-to-reload-info-message">
          {" "}
          <Typography
            variant="overline"
            sx={{ color: "primary.light", lineHeight: "2" }}
          >
            Slide down to reload
          </Typography>{" "}
          <SouthOutlinedIcon fontSize="small" sx={{ color: "primary.light" }} />{" "}
        </div>
      )}
      {(show || recursiveLoading) && (
        <div className="circular-progress-wrapper">
          <CircularProgress
            style={{ color: theme.palette.primary.light }}
            className="circular-progress"
          />
        </div>
      )}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={ref}
        className="slide-to-reload"
      >
        {props.children}
      </div>
    </>
  );
};

export default SlideToReload;
