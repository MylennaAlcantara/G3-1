import {createContext} from 'react';
import {User} from '../../types/user';

export type AuthContextType = {
    user: User | null;
    signout: () => void; 
}

export const AuthContext = createContext<AuthContextType>(null!);