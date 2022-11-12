import {ReactElement, useContext} from 'react';
import {UserContext} from '../context/user';

import Button from '@mui/material/Button';
import {
    Stack,
} from '@mui/material';

export default function NavBar(): ReactElement {
    let user = useContext(UserContext);
    let pages: Array<[string, string]> = [];
    
    if (user.rol === 'Instructor') {
        pages = [
            ['Mis Retos', `/users/${user.name}/challenges`],
            ['Crear Reto', `/users/${user.name}/create-challenge`],
        ];
    } else if (user.rol === 'Student') {
        pages = [
            ['Mis Soluciones', `/users/${user.name}/solutions`]
        ];
    }

    pages.unshift(["Retos", "/challenges/search"]);
    
    return (
            <Stack spacing={1} direction="row">
                {pages.map( ([name, route]) => <Button href={route}>{name}</Button>)}
            </ Stack>
    );
}
