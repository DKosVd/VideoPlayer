import { useEffect, useState } from "react";
import { manipulateWithDate } from "../utils/helpers";
import { MOCK_API_URL } from "../utils/constants";
import { TEvents } from "../utils/types";

type TUseAnalyticsEvent = {
  isLoading: boolean;
  isError: boolean;
  events: TEvents[];
};

export const useAnalyticsEvent = () => {
  const [analyticState, setAnalyticsState] = useState<TUseAnalyticsEvent>({
    isLoading: false,
    isError: false,
    events: [],
  });

  useEffect(() => {
    setAnalyticsState({
      ...analyticState,
      isLoading: true,
    });

    fetch(MOCK_API_URL)
      .then((res) => res.json())
      .then((data) => {
        const sortData = manipulateWithDate(data);
        setAnalyticsState((state) => ({
          ...state,
          isLoading: false,
          events: sortData,
        }));
      })
      .catch((err) => {
        setAnalyticsState({
          ...analyticState,
          isError: true,
        });
      });
  }, []);

  return { ...analyticState };
};
