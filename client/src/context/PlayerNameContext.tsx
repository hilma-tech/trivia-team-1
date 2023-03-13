import React, { createContext, FC, ReactNode, useContext, useState } from 'react';

export const usePlayerName = () => {
    const playerNameContext = useContext(PlayerNameContext)
    if (!playerNameContext) {
        throw new Error("");
    }

    return playerNameContext;
}
interface PlayerNameContext {
    setPlayerName: (name: string) => void;
    playerName: string;
}

interface PlayerNameProviderProps {
    children: ReactNode;
}

const PlayerNameContext = createContext<PlayerNameContext | null>(null);

export const PlayerNameProvider: FC<PlayerNameProviderProps> = ({ children }) => {
    const [nameOfPlayer, setNameOfPlayer] = useState<string>("");
    const changePlayerName = (name: string) => {
        setNameOfPlayer(name);
    };

    return <PlayerNameContext.Provider value={{ playerName: nameOfPlayer, setPlayerName: changePlayerName }}>
        {children}
    </PlayerNameContext.Provider>;

}; 