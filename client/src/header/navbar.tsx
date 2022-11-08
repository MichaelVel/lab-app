import {ReactElement} from 'react';

import Button from '@mui/material/Button';
import {
    Stack,
} from '@mui/material';

type Rol = "Instructor" | "Student" | "Anonymous" ;

interface Props {
   rol?: Rol;
}
export default function NavBar(props: Props): ReactElement {
    let pages = [ ["Retos", "/challenges"]];
    let pagesExt: Array<[string, string]> = [];
    
    if (props.rol === 'Instructor') {
        pagesExt = [
            ['Mis Retos',"users/1/challenges/1"],
            ['Crear Reto', "users/1/create-challenge/"],
        ];
    } else if (props.rol === 'Student') {
        pagesExt = [
            ['Mis Soluciones',"users/1/solutions/1"]
        ];
    }

    pages = pages.concat(pagesExt);
    
    return (
            <Stack spacing={1} direction="row">
                {pages.map( ([name, route]) => <Button href={route}>{name}</Button>)}
            </ Stack>
    );
}
