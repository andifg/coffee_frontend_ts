import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  functionToTrigger: () => Promise<void>;
}

const useInfiniteScroll = (props: Props): [boolean, () => void] => {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const triggered = useRef<boolean>(false);
  const noMoreData = useRef<boolean>(false);

  const resetTriggered = () => {
    triggered.current = false;
  };

  const handleScroll = useCallback(() => {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 100 &&
      !noMoreData.current
    ) {
      if (triggered.current) {
        return;
      }
      triggered.current = true;
      setShowLoading(true);

      props
        .functionToTrigger()
        .then(() => {
          setShowLoading(false);

          setTimeout(() => {
            triggered.current = false;
          }, 1000);
        })
        .catch(() => {
          setShowLoading(false);
        });
    }
  }, [props]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return [showLoading, resetTriggered];
};

export { useInfiniteScroll };
