import MainLayout from "../main/main";
import {Grid, Box, Button, Divider, ButtonGroup, Typography, Paper, } from "@mui/material";

import Section from "../main/section";
import {Outlet} from "react-router";
import {Stack} from "@mui/system";
import {ChallengeNavBar} from "../main/inner-navbar";
import StateChip from "../main/chips/state";
import VisibilityChip from "../main/chips/visibility";

export default function Challenge() {
  return (
    <MainLayout 
      sideBar={
        <Box sx={{ paddingTop: '2em'}} >
          <Grid 
            container
            justifyContent="center"
            spacing={1}
          >   
            <Grid item xs={11}>
              <Paper elevation={3}>
                <Box sx={{ padding: '1em'}}>
                  <Typography variant="h5">
                    ¡Manos a la obra!
                  </Typography>
                  <Box sx= {{ paddingTop: '0.8em', paddingBottom: '0.7em' }}>
                    <Button variant="contained" fullWidth>
                      Iniciar Entrega
                    </Button>
                  </Box>
                  <Divider  variant="middle" />
                  <Box sx= {{ paddingTop: '0.7em' }}>
                    <Typography variant="subtitle1">
                      <Box sx= {{ fontWeight: 'bold' }}>
                        Instrucciones de publicación: 
                      </Box>
                    </Typography>
                    <Typography variant="body1">
                      <Box sx= {{ paddingLeft: '0.4em', paddingTop:'0.4em' }}>
                          En esta sección el estudiante podrá ver las
                          indicaciones que el instructor asigno para la
                          entrega.
                      </Box>
                    </Typography>
                  </Box>  
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      }
      main={
        <Grid
          container
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={10}>
            <Section 
              elements={
              <>
                <Typography variant="h2">
                  Titulo del Reto
                </Typography>
                <Stack direction="row" spacing={1} >
                  <VisibilityChip visible />
                  <StateChip solved /> 
                </Stack>
                <Box sx={{
                  padding: '1em 0.2em 0.5em 0.2em', 
                  marginTop: '1em',
                  backgroundColor: 'azure',
                  }}>
                  <ChallengeNavBar id="1234" />
                </Box>
              </>
              }
            />
          </Grid>
          <Grid item xs={10}>
            <Section
              elements={
                <Box>
                  <Outlet />
                </Box>
              }
            />
          </Grid>
        </Grid>
      }
    />
);
}
