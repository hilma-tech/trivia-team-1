import { useAuth } from "@hilma/auth";
import { createContext, ReactNode, useState, FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/currentUser";
import decode from 'jwt-decode';

export const useUser = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return userContext;
};

interface UserProviderContext {
    setUser: React.Dispatch<React.SetStateAction<User>>;
    user: User;
    setInitialHistoryLength: React.Dispatch<React.SetStateAction<number>>;
    initialHistoryLength: number;
}
interface UserStoProviderProps {
    children: ReactNode;
}
const UserContext = createContext<UserProviderContext | null>(null)

const UserProvider: FC<UserStoProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({ userId: "", username: '' });
    const navigate = useNavigate()
    const [initialHistoryLength, setInitialHistoryLength] = useState(0);
    const { getAccessToken } = useAuth();

    useEffect(() => {
        const handleUnload = () => {
            localStorage.removeItem("quizHistoryLength")
        };

        window.addEventListener("unload", handleUnload);

        return () => {
            window.removeEventListener("unload", handleUnload);
        };
    }, []);


    useEffect(() => {
        async function getHistoryLength() {
            const rawHistory = localStorage.getItem('quizHistoryLength')
            if (!rawHistory) {
                localStorage.setItem('quizHistoryLength', JSON.stringify(window.history.length))
                setInitialHistoryLength(window.history.length)
            }
            else {
                const history = JSON.parse(rawHistory)
                setInitialHistoryLength(history)
            }
        }
        getHistoryLength()

        const token = getAccessToken();
        if (token) {
            const user = decode<{ id: string; username: string }>(token);
            setUser({ userId: user.id, username: user.username });
        }
    }, [])

    useEffect(() => {
        // If username is empty or session expires, navigate to login page and go back to initial history length
        async function getUser() {
            const token = getAccessToken();
            const myArray = [];
            for(let i = 0; i <= 100; i++){
                myArray.push(i);
            }

            if (!token) {
                const delta = window.history.length - initialHistoryLength;
                const link = window.location.pathname; 
                const quizRegex = /quiz\/\d+(\/.*)?$/;
                console.log('window.location.pathname: ', window.location.pathname);
                if (delta > 0 && link !== '/login' && link !== '/Register' && link !== '/about' && !quizRegex.test(link) && link !== '/loading-page'  ) {
                    window.history.go(-delta);
                    navigate("/");
                }
            }
        }
        getUser()
    });

    return (<UserContext.Provider value={{ user, setUser, initialHistoryLength, setInitialHistoryLength }}>
        {children}
    </UserContext.Provider>);
}

export default UserProvider;