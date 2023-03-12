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
    setInitialHistoryLength: React.Dispatch<React.SetStateAction<number>>;
    initialHistoryLength: number;
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
        const handleUnload = () => {
          localStorage.clear();
        };
    
        window.addEventListener("beforeunload", handleUnload);
    
        return () => {
          window.removeEventListener("beforeunload", handleUnload);
        };
      }, []);
    

    useEffect(() => {
        async function getHistoryLength() {
            const rawHistory = localStorage.getItem('quizHistoryLength')
            if (!rawHistory) {
                if (window.location.pathname === '/login') {
                    localStorage.setItem('quizHistoryLength', JSON.stringify(window.history.length))
                    setInitialHistoryLength(window.history.length)
                    console.log(window.history.length, "InitialHistoryLength");
                    
                }
            }
            else {
                const history = JSON.parse(rawHistory)
                setInitialHistoryLength(history)
                console.log(rawHistory, "rawHistory");
            }
        }
        getHistoryLength()
        const rawUser = localStorage.getItem('quizUser')
        if (rawUser) setUser(JSON.parse(rawUser))
    })

    useEffect(() => {
        // If username is empty or session expires, navigate to login page and go back to initial history length
        async function getUser() {
            const rawUser = localStorage.getItem('quizUser')
            if (rawUser) {
                const user = JSON.parse(rawUser);
                if (user.username === '') {
                    const delta = window.history.length - initialHistoryLength;
                    console.log(delta, " window.history.length - initialHistoryLength");
                    if (delta > 0 && window.location.pathname !== '/login' && window.location.pathname !== '/Register'&&window.location.pathname !== '/about') {
                        window.history.go(-delta);
                        navigate("/");
                    }
                }
            }
            else{
                if (user.username === '') {
                    const delta = window.history.length - initialHistoryLength;
                    console.log(delta, " window.history.length - initialHistoryLength");
                    if (delta > 0 && window.location.pathname !== '/login' && window.location.pathname !== '/Register'&&window.location.pathname !== '/about') {
                        window.history.go(-delta);
                        navigate("/");
                    }
                } 
            }
        }
        getUser()
    });

    return (<UserContext.Provider value={{ user, setUser ,initialHistoryLength, setInitialHistoryLength}}>
        {children}
    </UserContext.Provider>);
}

export default UserProvider;