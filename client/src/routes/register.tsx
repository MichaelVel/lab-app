import * as React from 'react';
import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {FormControl, InputLabel, MenuItem} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const theme = createTheme();

export async function action({request}: ActionFunctionArgs) {
  const data = await request.formData();
  const response = await fetch('/api/register', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify(Object.fromEntries(data)),
  });
  const body = await response.json();
  
  if (response.status !== 200) { 
    alert(body.message);
    return;
  }
  return redirect('/');
}

export default function SignUp() {
  const [rol, setRol] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setRol(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <Form method='post'>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Nombre de Usuario"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="rol-label">Rol</InputLabel>
                    <Select 
                      labelId="rol-label"
                      id="role"
                      name="role"
                      value={rol}
                      onChange={handleChange}
                      label="Rol">
                      <MenuItem value="instructor"> Instructor</MenuItem>
                      <MenuItem value="student"> Estudiante</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo Electronico"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarse
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/users/login" >
                    ¿Ya tienes una cuenta? Inicia Sesión
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
