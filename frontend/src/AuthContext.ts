import { createContext } from "react";
import { TokenData } from './utils/auth';

export type AuthContexData = {
  authenticated: boolean,
  tokenData?: TokenData
};

export type AuthContextType = {
  authContextData: AuthContexData,
  setAuthContextData: (authContextData: AuthContexData) => void
}

export const AuthContext = createContext<AuthContextType>({
  authContextData: {
    authenticated: false
  },
  setAuthContextData: () => null
});