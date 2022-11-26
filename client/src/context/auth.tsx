import { createContext, useContext, useMemo, ReactNode } from "react";
import { IUser } from './user';
import { useNavigate, Navigate} from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

interface IAuth {
  user?: IUser;
  login?: any;
  logout?: any;
}

interface Props {
    children?: ReactNode;
    roleAllowed?: string;
}

const AuthContext = createContext<IAuth>({});

export const AuthProvider = ({ children }: Props) => {
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


export const ProtectedRoute = ({children, roleAllowed}: Props) => {
  const { user } = useAuth();
  if (!user || user.role !== roleAllowed) {
    return <Navigate to='/' />;
  }
  return children;
};
