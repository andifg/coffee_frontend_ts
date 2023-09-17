import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "../../theme";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const SlideToReload = (props: Props): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  const ref = React.useRef<HTMLDivElement>(null);
  const initialY = React.useRef<number>(0);
  const MAX = 110;
  const k = 0.4;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // attach the event listener
    el.addEventListener("touchstart", handleTouchStart);

    return () => {
      // don't forget to cleanup
      el.removeEventListener("touchstart", handleTouchStart);
    };
  });

  function appr(x: number) {
    return MAX * (1 - Math.exp((-k * x) / MAX));
  }

  function removePullIndicator(el: HTMLDivElement) {
    const pullIndicator = el.querySelector(".pull-indicator");
    if (pullIndicator) {
      pullIndicator.remove();
    }
  }

  function handleTouchEnd() {
    console.log("TOUCH END");
    const el = ref.current;
    if (!el) return;

    // return the element to its initial position
    el.style.transform = "translateY(0)";
    // removePullIndicator(el.parentNode as HTMLDivElement);
    setShow(false);

    // add transition
    el.style.transition = "transform 0.2s";

    // listen for transition end event
    el.addEventListener("transitionend", onTransitionEnd);

    // cleanup
    el.removeEventListener("touchmove", handleTouchMove);
    el.removeEventListener("touchend", handleTouchEnd);
  }

  function onTransitionEnd() {
    const el = ref.current;
    if (!el) return;

    // remove transition
    el.style.transition = "";

    // cleanup
    el.removeEventListener("transitionend", onTransitionEnd);
  }

  function addPullIndicator(el: HTMLDivElement) {
    const indicator = el.querySelector(".pull-indicator");
    if (indicator) {
      return;
    }

    setShow(true);
  }

  function handleTouchStart(startEvent: TouchEvent) {
    const el = ref.current;
    if (!el) return;

    // get the initial Y position
    initialY.current = startEvent.touches[0].clientY;

    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);
  }

  function handleTouchMove(moveEvent: TouchEvent) {
    const el = ref.current;
    if (!el) return;

    const TRIGGER_THRESHOLD = 130;
    const SHOW_INDICATOR_THRESHOLD = 100;

    // get the current Y position
    const currentY = moveEvent.touches[0].clientY;

    // get the difference
    const dy = currentY - initialY.current;

    // update the element's transform
    el.style.transform = `translateY(${appr(dy)}px)`;

    const parentEl = el.parentNode as HTMLDivElement;

    console.log(`dy: ${dy}`);

    if (dy > TRIGGER_THRESHOLD) {
      console.log("Flip arrow");
      // flipArrow(parentEl);
    } else if (dy > SHOW_INDICATOR_THRESHOLD) {
      //   console.log("SHOW")
      //   console.log("parent: " + parentEl)
      addPullIndicator(parentEl);
    } else {
      //   console.log("REMOVE")
      removePullIndicator(parentEl);
    }
  }

  return (
    <>
      {show && (
        <div className="circular-progress-wrapper">
          <CircularProgress style={{ color: theme.palette.primary.light }} />
        </div>
      )}
      <div ref={ref} className="slide-to-reload">
        {props.children}
      </div>
    </>
  );
};

export default SlideToReload;
