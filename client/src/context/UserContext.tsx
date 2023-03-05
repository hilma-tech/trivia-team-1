import { createContext, ReactNode, useState, FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "../utils/currentUser";

export const useUser = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return userContext;
};

interface UserProviderContext {
    setUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
    user: CurrentUser;
}
interface UserProviderProps {
    children: ReactNode;
}
const UserContext = createContext<UserProviderContext | null>(null)

const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<CurrentUser>({ userId: 0, username: '' });
    const navigate = useNavigate()
    const [initialHistoryLength, setInitialHistoryLength] = useState(0);

    useEffect(() => {
        async function getHistoryLength() {
            let theUser
            const strUser = localStorage.getItem('quizHistoryLength')
            if (!strUser) {
                localStorage.setItem('quizHistoryLength', JSON.stringify(window.history.length))
                setInitialHistoryLength(window.history.length)
            }
            else {
                theUser = JSON.parse(strUser)
                setInitialHistoryLength(theUser)
            }
        }
        getHistoryLength()
    }, [])

    useEffect(() => {
        // If username is empty or session expires, navigate to login page and go back to initial history length
        async function getUser() {
            let theUser
            const userStr = localStorage.getItem('quizUser')
            if (userStr) {
                theUser = JSON.parse(userStr);
                if (theUser.username === '') {
                    console.log("hihihi");
                    const delta = window.history.length - initialHistoryLength;
                    if (delta > 0 && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                        window.history.go(-delta);
                        navigate("/login");
                        console.log("delta ", delta)
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