import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAnalyticsEvent } from "../hooks/useAnalyticsEvent";
import { searchEventByTime } from "../utils/helpers";
import { TEvents } from "../utils/types";
import { AppContextApi } from "./apiContext";
import { AppContextBox } from "./AppContextBox";
import { AppContextRef } from "./AppContextRef";
import { AppContextCurrentTime } from "./AppContextCurrentTime";

type TAppContextProps = {
  isLoading: boolean;
  isError: boolean;
  events: TEvents[];
};

const AppContext = createContext<TAppContextProps | null>(null);

export const AppContextProvider: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);

  const { isLoading, isError, events } = useAnalyticsEvent();
  const [currentTime, setCurrentTime] = useState({ time: 0 });
  const [currentEvents, setCurrentEvents] = useState<TEvents[]>(
    [] as TEvents[]
  );
  const [currentEventsSet, setCurrentEventsSet] = useState(new Set());

  const api = useMemo(() => {
    const handleSetCurrentTime = (time: number) => {
      setCurrentTime({ time });
    };

    const handleSetCurrentTimeToVideo = (time: number) => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.currentTime = time / 1000;
      }
      setCurrentEvents([]);
      setCurrentEventsSet(new Set());
    };

    return {
      handleSetCurrentTime,
      handleSetCurrentTimeToVideo,
    };
  }, [events, videoPlayerRef]);

  const handleDeleteBoxFromSet = (id: string) => {
    currentEventsSet.delete(id);
    const newResultAfterDuration = currentEvents.filter((el) => el.id !== id);
    setCurrentEvents(newResultAfterDuration);
  };

  useEffect(() => {
    const timeEvents = searchEventByTime(events, currentTime.time * 1000);

    if (!timeEvents) {
      return;
    }

    const idTimeEvents = timeEvents?.map((event) => event.id);
    const newSetCurrentEvents = new Set(currentEventsSet);
    idTimeEvents.forEach((id) => newSetCurrentEvents.add(id));
    setCurrentEventsSet(newSetCurrentEvents);

    const filteredTimeEvents = timeEvents.filter((res) => {
      if (!currentEventsSet.has(res.id)) {
        return res;
      }
    });

    if (filteredTimeEvents) {
      setCurrentEvents((oldResult) => [...oldResult, ...filteredTimeEvents]);
    }
  }, [currentTime]);

  return (
    <AppContextApi.Provider value={api}>
      <AppContext.Provider
        value={{
          isError,
          isLoading,
          events,
        }}
      >
        <AppContextBox.Provider
          value={{
            handleDeleteBoxFromSet,
            boxes: currentEvents,
          }}
        >
          <AppContextRef.Provider value={videoPlayerRef}>
            <AppContextCurrentTime.Provider value={currentTime.time}>
              {children}
            </AppContextCurrentTime.Provider>
          </AppContextRef.Provider>
        </AppContextBox.Provider>
      </AppContext.Provider>
    </AppContextApi.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "AppContext has to be used within <useAppContext.Provider>"
    );
  }

  return context;
};
