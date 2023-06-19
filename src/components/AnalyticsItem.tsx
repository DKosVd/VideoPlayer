import { FC } from "react";
import { TEvents } from "../utils/types";
import { useAppContextApi } from "../context";

type TAnalyticItemProps = Omit<TEvents, "id" | "zone"> & { idx: number };

export const AnalyticsItem: FC<TAnalyticItemProps> = ({
  timestamp,
  duration,
  formatDate,
}) => {
  const { handleSetCurrentTimeToVideo } = useAppContextApi();
  const handleSetActiveEvent = () => {
    handleSetCurrentTimeToVideo(timestamp);
  };

  return (
    <div className="analytics_item" onClick={handleSetActiveEvent}>
      <div>Time: {formatDate}</div>
      <div>Duration: {duration / 1000}s</div>
    </div>
  );
};
