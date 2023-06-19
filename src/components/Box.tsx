import { FC, useCallback, useEffect, useState } from "react";

import { outOfDurationTime } from "../utils/helpers";
import { TEvents } from "../utils/types";
import { useAppBoxContext, useCurrentTimeContext } from "../context";

export const Box: FC<TEvents> = ({ id, zone, duration, timestamp }) => {
  const checkTime = useCallback(outOfDurationTime(timestamp, duration), [
    timestamp,
    duration,
  ]);

  const currentTime = useCurrentTimeContext();
  const { handleDeleteBoxFromSet } = useAppBoxContext();

  useEffect(() => {
    const isDurationOut = checkTime(currentTime * 1000);
    if (isDurationOut) {
      handleDeleteBoxFromSet(id);
    }
  }, [currentTime]);

  return (
    <div>
      <div
        key={id}
        className="box_player"
        style={{
          transform: `translate(${zone.left}px, ${zone.top}px)`,
          width: `${zone.width}px`,
          height: `${zone.height}px`,
        }}
      ></div>
    </div>
  );
};
