import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

interface Props {
    children: JSX.Element | JSX.Element[];
}

const ProtectedRoute = ({ children }: Props ) => {
    const { user } = useContext( AuthContext );

    if( !user ){
        return <Navigate to="/"/>;
    } else {
        return <>{children}</>
    }
}

export default ProtectedRoute