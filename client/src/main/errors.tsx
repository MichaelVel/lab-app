import {Box, Grid, Typography} from '@mui/material';
import { useRouteError } from 'react-router-dom';


export default function ErrorPage({message}: {message?: string}) {
  const error: any = useRouteError();
  
  return (
    <Grid 
      container 
      direction="column"
      justifyContent="center"
      spacing={1}
      alignItems="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'rgba(var(--main-color), 1)'
        }}
    >
      <Grid item>
        <Typography 
          variant="h3"
          sx={{
            color: 'rgba(var(--dark-shades), 1)'
          }}
        >Opps!</Typography>   
      </Grid> 
      <Grid item>
        <Typography
          sx={{
            color: 'rgba(var(--dark-shades), 1)',
            textAlign: 'center'
          }}
        >
          Un error inesperado a ocurrido,
          <br/> 
          disculpa los inconvenientes.
        </Typography>   
      </Grid> 
      <Grid item>
        <Typography
          sx={{
            color: 'rgba(var(--dark-accent), 0.5)',
            textAlign: 'center'
          }}
        >
          <i>{message}</i>
          <br/>
          <i>{error.statusText || error.message}</i>
        </Typography>   
      </Grid> 
    </Grid>
  );
}
