import { useAppContext } from "../context/appContext";
import { AnalyticsItem } from "./AnalyticsItem";

export const Analytics = () => {
  const { isLoading, isError, events } = useAppContext();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>isError</div>;
  }

  return (
    <div className="analytics">
      {events.map((event, idx) => (
        <AnalyticsItem idx={idx} key={event.id} {...event} />
      ))}
    </div>
  );
};
