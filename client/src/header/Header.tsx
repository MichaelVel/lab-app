import {Container, Grid, Box, Button} from '@mui/material';
import {ReactElement} from 'react';
import './Header.css';

import NavBar from './navbar';
import {
    AccountMenu,
    UserLoginSection,
} from './user';

type Rol = "Instructor" | "Student" | "Anonymous" ;

interface Props {
   rol?: Rol;
}

// The Main component of the header, contains the state of the header
export default function Header(props: Props): ReactElement {
    return (
        <header>
            <Grid container alignItems={'center'} spacing={3}>
                <Grid item xs={3}> 
                    <h1>LabChallenge</h1>
                </Grid>
                <Grid item xs={4}> 
                    <NavBar rol={props.rol}/>
                </Grid>
                <Grid item xs={5}>
                    {
                        props.rol === 'Anonymous' 
                            ? <UserLoginSection />
                            : <AccountMenu />
                    }
                </Grid>
            </Grid>
        </header>
    );
    }


