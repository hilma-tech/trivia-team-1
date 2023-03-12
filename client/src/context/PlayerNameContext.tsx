import React, { createContext, FC, ReactNode, useState } from 'react';


interface PlayerNameContext {
    changePlayerName: (name: string) => void;
    nameOfPlayer: string;
}

interface PlayerNameProviderProps {
    children: ReactNode;
}

export const PlayerNameContext = createContext<PlayerNameContext | null>(null);

export const PlayerNameProvider: FC<PlayerNameProviderProps> = ({ children }) => {
    const [nameOfPlayer, setNameOfPlayer] = useState<string>("");
    const changePlayerName = (name: string) => {
        setNameOfPlayer(name);
    };

    return <PlayerNameContext.Provider value={{ nameOfPlayer, changePlayerName }}>
        {children}
    </PlayerNameContext.Provider>;

}; 