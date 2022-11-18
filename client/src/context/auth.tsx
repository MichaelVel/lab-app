import { createContext, useContext, useMemo } from "react";
import { IUser } from './user';
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface IAuth {
  user?: IUser;
  login?: any;
  logout?: any;
}

const AuthContext = createContext<IAuth>({});

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    const login = async (data: IUser) => {
        setUser(data);
        navigate("/");
    };

    const logout = () => {
        setUser(null);
        navigate("/", {replace: true});
    }

    const value = useMemo(
      () => ({
        user,
        login,
        logout
      }), [user]);
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};



