import { DELTA } from "./constants";
import { TEvents } from "./types";

export const isInRangeWithDelta = (timestamp: number, time: number) => {
  const timeInMsPlusDelta = timestamp + DELTA;
  const timeInMsMinusDelta = timestamp - DELTA;
  return time >= timeInMsMinusDelta && time <= timeInMsPlusDelta;
};

export const outOfDurationTime = (timestamp: number, duration: number) => {
  const endTime = timestamp + duration;
  return (currentTime: number | undefined) => {
    if (currentTime) {
      return currentTime >= endTime;
    }
  };
};

export const searchEventByTime = (events: TEvents[], time: number) => {
  if (!events.length) {
    return;
  }
  return events.filter((event) => isInRangeWithDelta(event.timestamp, time));
};

export const manipulateWithDate = (events: TEvents[]) => {
  const getLeadingZero = (number: number) => {
    return `0${number}`.slice(-2);
  };

  const formatedDate = (event: TEvents) => {
    const date = new Date(event.timestamp);
    const minutes = getLeadingZero(date.getMinutes());
    const seconds = getLeadingZero(date.getSeconds());
    const milliseconds = date.getMilliseconds();
    return {
      ...event,
      formatDate: `${minutes}:${seconds}:${milliseconds}`,
    };
  };

  const comparator = (firstDate: TEvents, secondDate: TEvents) =>
    new Date(firstDate.timestamp).getTime() -
    new Date(secondDate.timestamp).getTime();

  const formatDate = events.sort(comparator).map(formatedDate);
  return formatDate;
};
