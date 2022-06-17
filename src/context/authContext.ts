import { createContext } from 'react';
import { UserCredential, User } from 'firebase/auth' 

interface AuthContextProps {
    user?: User;
    signUp: (email: string, password: string) => void;
    signIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;


}


export const AuthContext = createContext( {} as AuthContextProps);