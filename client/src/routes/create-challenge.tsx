import MainLayout from "../main/main";
import {Grid, Box, Stack, Button, Divider, ButtonGroup, TextField} from "@mui/material";

import { AllowAnswers , VisibilityOption} from '../main/creation-config';
import Section from "../main/section";
import InputChipsArray from "../main/inputs/chip-array";
import ListInput from "../main/inputs/input-list";
import {Form} from "react-router-dom";

export default function CreateChallenge() {
    return (
      <Form method="get">
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
                <Grid
                    container
                    justifyContent="center"
                    spacing={1}
                >
                    <Grid item xs={10}>
                        <Section
                            name="¿Cual es el nombre de tu reto?"
                            elements={
                                <TextField size="small" label="Titulo" name="title"/>
                            }
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Section
                            name="Contexto"
                            elements={
                                <Grid container spacing={1}>
                                    <Grid item xs={6} sx={{padding:'0.8em'}}>
                                        <h3>Tema Principal</h3> 
                                        <TextField 
                                            size="small" 
                                            name="mainTopic"
                                            label="Titulo"
                                        />
                                        <h3>Otros Temas</h3> 
                                        <InputChipsArray />
                                    </Grid>
                                    <Grid item xs={6} sx={{padding:'0.8em'}}>
                                        <h3>Descripción</h3> 
                                        <TextField 
                                            size="small"
                                            label="Descripción"
                                            multiline
                                            minRows={6}
                                            fullWidth
                                            name="description"
                                        />
                                    </Grid>
                                </Grid>
                            }
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Section
                            name="¡Manos a la obra!"
                            elements={
                                <Grid container spacing={1}>
                                    <Grid item xs={6} sx={{padding:'0.8em'}}>
                                        <h3>Materiales</h3> 
                                        <ListInput 
                                            listName="Materiales añadidos"
                                            inputName='materials'/>
                                    </Grid>
                                    <Grid item xs={6} sx={{padding:'0.8em'}}>
                                        <h3>Instrucciones</h3> 
                                        <ListInput 
                                            listName="Pasos del experimento"
                                            inputName='instructions'/>
                                    </Grid>
                                </Grid>
                            }
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Section
                            name="Para el alumno"
                            elements={
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sx={{padding:'0.8em'}}>
                                        <h3>Instrucciones de entrega</h3> 
                                        <TextField 
                                            size="small"
                                            label="Descripción"
                                            multiline
                                            minRows={4}
                                            fullWidth
                                            name="submitInstructions"
                                        />
                                    </Grid>
                                </Grid>
                            }
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <Section
                            name="Explicación"
                            elements={
                                <Grid container spacing={1}>
                                    <Grid item xs={6} sx={{padding:'0.8em'}}>
                                        <p>
                                        En esta sección el maestro debe subir
                                        la explicación del experimento: el que
                                        el como y un desarrollo breve del tema
                                        principal. Esta explicación puede estar 
                                        en un formato PDF, JPEG o el maestro puede
                                        optar por subir un video a youtube y subir
                                        el link. TODO: El desarrollo de esta sección
                                        se llevara a cabo en su totalidad en el 
                                        proximo sprint.
                                        </p> 
                                    </Grid>
                                    <Grid item xs={6} sx={{padding:'0.8em'}}>
                                        <TextField 
                                            size="small"
                                            label="Descripción"
                                            multiline
                                            minRows={4}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            }
                        />
                    </Grid>
                </Grid>
            }
        />
      </Form>
    );
}
