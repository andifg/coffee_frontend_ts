import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/index";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export default function useReloadChildren(
  numberOfChildren: number,
  actionCreatorWithPayload: ActionCreatorWithPayload<boolean, string>,
): [() => void, () => void] {
  const dispatch = useDispatch<AppDispatch>();
  const childrenLoadedCount = useRef(0);

  const childrenLoaded = () => {
    childrenLoadedCount.current += 1;

    if (childrenLoadedCount.current === numberOfChildren) {
      childrenLoadedCount.current = 0;
      // setRecursiveLoading(false);
      dispatch(actionCreatorWithPayload(false));
      console.log("Self already loaded and all children loaded");
    }
  };

  const resetChildrenLoaded = () => {
    childrenLoadedCount.current = 0;
  };

  return [childrenLoaded, resetChildrenLoaded];
}
