import { useRef } from "react";
import { UUID } from "uuidv7";

const useCalculateTimeDiffFromUuid = (uuid: string) => {
  const timeDiffString = useRef("");

  const timestampBytes = new Uint8Array(8);
  timestampBytes.set(
    new Uint8Array(UUID.parse(uuid).bytes.buffer.slice(0, 6)),
    2,
  );
  const timestampMs = new DataView(timestampBytes.buffer).getBigUint64(0);

  const past = new Date(Number(timestampMs));
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  //   console.log(`Past date: ${past}`);
  //   console.log(`Now date: ${now}`);
  //   console.log(`Diff in seconds: ${diffInSeconds}`);

  const calculateTimeDiffString = () => {
    // console.log("Recalculate time diff");
    if (diffInSeconds < 60 * 60) {
      // setTimeDiff(`${Math.floor(diffInSeconds / 60)} min ago`)
      timeDiffString.current = `${Math.floor(diffInSeconds / 60)} min ago`;
      return;
    }
    if (diffInSeconds < 60 * 60 * 24) {
      timeDiffString.current = `${Math.floor(
        diffInSeconds / 60 / 60,
      )} hours ago`;
      return;
    }
    if (diffInSeconds < 60 * 60 * 24 * 30) {
      timeDiffString.current = `${Math.floor(
        diffInSeconds / 60 / 60 / 24,
      )} days ago`;
      return;
    }
    timeDiffString.current = `${Math.floor(
      diffInSeconds / 60 / 60 / 24 / 30,
    )} months ago`;
  };

  calculateTimeDiffString();

  //   console.log(`Time diff: ${timeDiffString.current}`);

  return timeDiffString.current;
};

export { useCalculateTimeDiffFromUuid };
