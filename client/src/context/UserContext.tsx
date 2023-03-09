import { createContext, ReactNode, useState, FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/currentUser";

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
}
interface UserProviderProps {
    children: ReactNode;
}
const UserContext = createContext<UserProviderContext | null>(null)

const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({ userId: 0, username: '' });
    const navigate = useNavigate()
    const [initialHistoryLength, setInitialHistoryLength] = useState(0);

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
        const  rawUser = localStorage.getItem('quizUser')
        if (rawUser)
        setUser(JSON.parse(rawUser))
    }, [])

    useEffect(() => {
        // If username is empty or session expires, navigate to login page and go back to initial history length
        async function getUser() {
            const rawUser = localStorage.getItem('quizUser')
            if (rawUser) {
                const user = JSON.parse(rawUser);
                if (user.username === '') {
                    const delta = window.history.length - initialHistoryLength;
                    if (delta > 0 && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                        window.history.go(-delta+1);
                        navigate("/");
                    }
                }
            }
        }
        getUser()
    });

    return (<UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>);
}

export default UserProvider;