import React, { createContext, ReactNode, FC, useState, useContext } from "react"
import GenericPop from "./GenericPop";

interface PopContextInterface {
  setPopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popOpen: boolean;
  popHandleClickOpen: () => void;
  popHandleClose: () => void;

}

interface PopProviderProps {
  children: ReactNode;
}

const popContext = createContext<PopContextInterface | null>(null);

export const PopContextProvider: FC<PopProviderProps> = ({ children }) => {
  const [popOpen, setPopOpen] = useState(false);

  const popHandleClickOpen = () => {
    setPopOpen(true);
  };

  const popHandleClose = () => {
    setPopOpen(false);
  };

  const contextValue: PopContextInterface = {
    setPopOpen: setPopOpen,
    popOpen: popOpen,
    popHandleClickOpen: popHandleClickOpen,
    popHandleClose: popHandleClose,
  }

  return (
    <popContext.Provider value={contextValue}>
      {children}
    </popContext.Provider>
  )
}

export const usePopContext = () => {
  // const result = popContext.Provider.value
  const result = useContext(popContext);

  if (result === null) throw new Error("You forgot to put the PopContextProvider!");

  return result;
}
