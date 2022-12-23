import React, { useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "./authContext";
import {User} from "../../types/user";
import { useApi } from "../../hooks/useApi";


export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    const signin = async ( matricula: string, senha: string) => {
        const data = await api.signin( matricula, senha);
        if(data.user){
            setUser(data.user);
            return true;
        }
        return false;
    }

    const signout = async () => {
        await api.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, signin, signout}}>
            {children}
        </AuthContext.Provider>
    );
}