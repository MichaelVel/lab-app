import {
  LoaderFunctionArgs,
  Outlet,
  useLoaderData
} from "react-router";

import {
  Grid,
  Box,
  Button,
  Divider,
  Typography,
  Paper,
} from "@mui/material";
import {Stack} from "@mui/system";

import Section from "../main/section";
import MainLayout from "../main/main";
import {ChallengeNavBar} from "../main/inner-navbar";
import StateChip from "../main/chips/state";
import VisibilityChip from "../main/chips/visibility";


export async function loader({params}: LoaderFunctionArgs) {
  const response = await fetch(`/api/challenges/${params.id}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
  });

  const body = await response.json();
  console.log(body);
  
  if (response.status !== 200) { 
    alert(body.message);
    return;
  }

  return body;
}

export async function action() {
  // unimplemented
}

export default function Challenge() {
  const challenge: any = useLoaderData();
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
                  {challenge.allowAnswers &&
                    <>
                      <Divider  variant="middle" />
                      <Box sx= {{ paddingTop: '0.7em' }}>
                        <Typography variant="subtitle1">
                          <Box sx= {{ fontWeight: 'bold' }}>
                            Instrucciones de publicación: 
                          </Box>
                        </Typography>
                        <Typography variant="body1">
                          <Box sx= {{ paddingLeft: '0.4em', paddingTop:'0.4em' }}>
                            {challenge.instructions.submition}
                          </Box>
                        </Typography>
                      </Box>  
                    </>
                  }
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
          sx={{ marginTop: '2em' }}
        >
          <Grid item xs={10}>
            <Section 
              elements={
              <>
                <Typography variant="h2">
                  {challenge.name}
                </Typography>
                <Stack direction="row" spacing={1} >
                  <VisibilityChip visible={challenge.isPublic}/>
                  <StateChip solved /> 
                </Stack>
                <Box sx={{
                  padding: '1em 0.2em 0.5em 0.2em', 
                  marginTop: '1em',
                  backgroundColor: 'azure',
                  }}>
                  <ChallengeNavBar id={`${challenge._id}`} />
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
