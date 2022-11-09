import MainLayout from "../main/main";
import {Grid, Box, Stack, Button, Divider, ButtonGroup, TextField} from "@mui/material";

import { AllowAnswers , VisibilityOption} from '../main/creation-config';
import Section from "../main/section";

export default function CreateChallenge() {
    return (
      <form>
        <MainLayout 
            sideBar={
                <Box sx={{
                    paddingTop: '2em',
                }}
                >
                    <Grid 
                        container
                        justifyContent="center"
                        spacing={1}
                    >   
                        <Grid item xs={9}>
                            <h2>Configuración Global</h2>
                        </Grid>
                        <Grid item xs={8}>
                            <Divider />
                            <VisibilityOption />
                        </Grid>
                        <Grid item xs={8}>
                            <Divider />
                            <AllowAnswers />
                        </Grid>
                        <Grid item xs= {8}>
                            <ButtonGroup orientation="vertical">
                                <Button type="submit">Guardar Cambios</Button>
                                <Button type="submit">Submit</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            }
            main={
                <div>
                    <Grid
                        container
                        justifyContent="center"
                        spacing={1}
                    >
                        <Grid item xs={10}>
                            <Section
                                name="¿Cual es el nombre de tu reto?"
                                elements={
                                    <TextField size="small" label="Titulo"/>
                                }
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Section
                                name="Contexto"
                                elements={
                                    <Stack direction="row">
                                        <h3>Tema Principal</h3> 
                                        <TextField size="small" label="Titulo"/>
                                    </Stack>
                                }
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Section
                                name="¡Manos a la obra!"
                                elements={
                                    <TextField size="small" label="Titulo"/>
                                }
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Section
                                name="Para el alumno"
                                elements={
                                    <TextField size="small" label="Titulo"/>
                                }
                            />
                        </Grid>
                        <Grid item xs={10}>
                            <Section
                                name="Explicación"
                                elements={
                                    <TextField size="small" label="Titulo"/>
                                }
                            />
                        </Grid>
                    </Grid>
                </div>
            }
        />
      </form>
    );
}
