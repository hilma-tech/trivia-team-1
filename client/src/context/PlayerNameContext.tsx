import React, { createContext, FC, ReactNode, useState } from 'react';


interface PlayerNameContext{
    changePlayerName: (name: string) => void;
    nameOfPlayer: string;
}

interface PlayerNameProviderProps {
    children: ReactNode;
}

export const PlayerName = createContext<PlayerNameContext | null>(null);

export const PlayerNameProvider: FC<PlayerNameProviderProps> = ({ children }) => {
    const [nameOfPlayer, setNameOfPlayer] = useState<string>("");
    const changePlayerName = (name:string) => {
        setNameOfPlayer(name);
    };

    return <PlayerName.Provider value={{ nameOfPlayer, changePlayerName }}>
        {children}
    </PlayerName.Provider>;

}; 