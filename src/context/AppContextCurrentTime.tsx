import { createContext, useContext } from "react";

export const AppContextCurrentTime = createContext<number | null>(null);

export const useCurrentTimeContext = () => {
  const context = useContext(AppContextCurrentTime);

  if (!context) {
    throw new Error(
      "AppContextCurrentTime has to be used within <useCurrentTimeContext.Provider>"
    );
  }

  return context;
};
