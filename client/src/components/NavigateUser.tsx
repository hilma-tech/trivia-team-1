import { Navigate } from 'react-router-dom';
import { useAuth } from '@hilma/auth';

const NavigateUser = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return <Navigate replace to="login" />;

    return <Navigate replace to="/enterance-page" />;
}

export default NavigateUser;