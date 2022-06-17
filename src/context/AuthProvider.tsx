import { useEffect, useState } from "react";
import { AuthContext } from "./authContext"
import { auth, db } from "../firebase-config";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged, User } from 'firebase/auth';

import { setDoc, doc } from 'firebase/firestore';

interface Props {
    children: JSX.Element | JSX.Element[];
}


const AuthProvider = ( { children }:Props) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged( auth, (currentUser) => {
            setUser( currentUser! );
        })

        return () => {
            unSubscribe();
        }
    }, [])
    

    const signUp = ( email: string, password: string ) => {
        createUserWithEmailAndPassword( auth, email, password);
        setDoc( doc(db, 'users', email), {
            savedShows: []
        })
    }

    const signIn = ( email: string, password: string ) => {
        return signInWithEmailAndPassword( auth, email, password)
    }

    const logOut = () => {
        return signOut(auth);
    }
    
    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            logOut,
            signUp
        }} >
            { children }

        </AuthContext.Provider>
    )
}

export default AuthProvider