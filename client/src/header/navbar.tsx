import {ReactElement } from 'react';
import { useAuth } from '../context/auth'; 
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import {
    Stack,
} from '@mui/material';
export default function NavBar(): ReactElement {
    let navigate = useNavigate();
    let {user} = useAuth();
    let pages: Array<[string, string]> = [["Retos", "/challenges/search"]];
    
    if (user) {
      if (user.role === 'instructor') {
        pages = pages.concat([
            ['Mis Retos', `/users/${user.name}/challenges`],
            ['Crear Reto', `/users/${user.name}/create-challenge`],
        ]);
      } else if (user.role === 'student') {
        pages = pages.concat([
            ['Mis Soluciones', `/users/${user.name}/solutions`]
        ]);
      }
    }
    
    return (
      <Stack spacing={1} direction="row">
          {
            pages.map( ([name, route], i:number) => {
              return (
              <Button key={i} onClick={() => navigate(route)}>
                {name}
              </Button>
              );
            })
          }
      </ Stack>
    );
}
