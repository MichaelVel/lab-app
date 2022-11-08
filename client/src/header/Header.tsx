import {Grid} from '@mui/material';
import {ReactElement, useContext} from 'react';
import {UserContext} from '../context/user';
import './Header.css';

import NavBar from './navbar';
import {
    AccountMenu,
    UserLoginSection,
} from './user';

export default function Header(): ReactElement {
    const user = useContext(UserContext);

    return (
        <header>
            <Grid container alignItems={'center'} spacing={3}>
                <Grid item xs={3}> 
                    <h1>LabChallenge</h1>
                </Grid>
                <Grid item xs={4}> 
                    <NavBar />
                </Grid>
                <Grid item xs={5}>
                    {
                        user.rol === 'Anonymous' 
                            ? <UserLoginSection />
                            : <AccountMenu />
                    }
                </Grid>
            </Grid>
        </header>
    );
    }


