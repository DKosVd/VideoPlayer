import { createContext, useContext } from "react";
import { TEvents } from "../utils/types";

type TAppBoxContextProps = {
  handleDeleteBoxFromSet: (id: string) => void;
  boxes: TEvents[];
};

export const AppContextBox = createContext<TAppBoxContextProps | null>(null);

export const useAppBoxContext = () => {
  const context = useContext(AppContextBox);

  if (!context) {
    throw new Error(
      "AppContextBox has to be used within <useAppBoxContext.Provider>"
    );
  }

  return context;
};
