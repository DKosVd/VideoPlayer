import { createContext, useContext } from "react";

export const AppContextRef =
  createContext<React.RefObject<HTMLVideoElement> | null>(null);

export const useRefContext = () => {
  const context = useContext(AppContextRef);

  if (!context) {
    throw new Error(
      "AppContextRef has to be used within <useRefContext.Provider>"
    );
  }

  return context;
};
