import { createContext } from "react";

type Rol = "Instructor" | "Student" | "Anonymous" ;

export interface User {
    name: string,
    rol: Rol,
}

export const UserContext = createContext<User>({
    name: 'anonymous',
    rol: 'Anonymous',
});

