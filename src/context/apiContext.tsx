import { createContext, useContext } from "react";

type TAppContextApiProps = {
  handleSetCurrentTime: (time: number) => void;
  handleSetCurrentTimeToVideo: (time: number) => void;
};

export const AppContextApi = createContext<TAppContextApiProps | null>(null);

export const useAppContextApi = () => {
  const context = useContext(AppContextApi);

  if (!context) {
    throw new Error(
      "AppContextApi has to be used within <useAppContextApi.Provider>"
    );
  }

  return context;
};
