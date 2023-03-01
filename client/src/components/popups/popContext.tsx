import React, { createContext, ReactNode, FC, useState, useContext } from "react"
import { PopupsPropType } from "./GenericPop";

interface PopContextInterface {
  setPopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popOpen: boolean;
  popHandleClickOpen: () => void;
  popHandleClose: () => void;
  insertPopTypeToLs: (type: PopupsPropType) => void;
  getPopTypeFromLs: () => PopupsPropType
}

interface PopProviderProps {
  children: ReactNode;
}

const popContext = createContext<PopContextInterface | null>(null);

export const PopContextProvider: FC<PopProviderProps> = ({ children }) => {
  const [popOpen, setPopOpen] = useState(false);

  const insertPopTypeToLs = (type: PopupsPropType) => localStorage.setItem('popType', type);
  const getPopTypeFromLs = () => {
    let abc = localStorage.getItem('popType');
    if (abc === 'finishedQuiz' || abc === 'savedSuccessfully'|| abc === 'copyQuiz'|| abc === 'deleteQuiz' || abc === 'exitGame' || abc === 'saveChanges'){
      return abc
    } else {
      return 'copyQuiz'
    }
  }

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
    insertPopTypeToLs: insertPopTypeToLs,
    getPopTypeFromLs: getPopTypeFromLs

  }

  return (
    <popContext.Provider value={contextValue}>
      {children}
    </popContext.Provider>
  )
}

export const usePopContext = () => {
  const result = useContext(popContext);

  if (result === null) throw new Error("You forgot to put the PopContextProvider!");

  return result;
}
