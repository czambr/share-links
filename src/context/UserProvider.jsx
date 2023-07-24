// ---------------------------------------
// Librerias
// ---------------------------------------
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

// Definicion del contexto: Usuario
export const UserContext = createContext();

// Definión del provedor del contexto
const UserProvider = props => {
    const [user, setUser] = useState(false);

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => {
            if (user) {
                const { email, photoURL, displayName, uid } = user;
                setUser({ email, photoURL, displayName, uid });
            } else {
                setUser(null);
            }
        });
        return () => unsuscribe();
    }, []);

    const registerUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const loginUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    const singOutUser = () => signOut(auth);

    return (
        <UserContext.Provider
            value={{ user, setUser, registerUser, loginUser, singOutUser }}>
            {props.children}
        </UserContext.Provider>
    );
};
export default UserProvider;
