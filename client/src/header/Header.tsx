import {Grid, Box} from '@mui/material';
import {useAuth} from '../context/auth';
import logo from './ligthLogo.png';

import NavBar from './navbar';
import {
    AccountMenu,
    UserLoginSection,
} from './user';

export default function Header() {
    const {user} = useAuth();

    return (
      <header>
        <Box
          sx={{
            backgroundColor: 'rgba(var(--dark-shades), 0.94)'
          }}
        >
          <Grid container alignItems={'center'} spacing={3} 
            sx={{
              paddingTop: '1em',
              paddingLeft: '1em',
              paddingBottom: '0.5em',
            }}>
            <Grid item xs={3}> 
              <img src={logo} alt="Lab Challenge Logo" />
            </Grid>
            <Grid item xs={4}> 
              <NavBar />
            </Grid>
            <Grid item xs={5}>
              {!user ? <UserLoginSection /> : <AccountMenu /> }
            </Grid>
          </Grid>
        </Box>
      </header>
    );
    }


