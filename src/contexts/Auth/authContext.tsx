import {createContext} from 'react';
import {User} from '../../types/user';

export type AuthContextType = {
    user: User | null;
    signin: (company: string, matricula: string, password:string) => Promise<boolean>;
    signout: () => void; 
}

export const AuthContext = createContext<AuthContextType>(null!);