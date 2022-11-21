import {Grid} from '@mui/material';
import {useAuth} from '../context/auth';

import NavBar from './navbar';
import {
    AccountMenu,
    UserLoginSection,
} from './user';

export default function Header() {
    const {user} = useAuth();

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
            {!user ? <UserLoginSection /> : <AccountMenu /> }
          </Grid>
        </Grid>
      </header>
    );
    }


