import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel, 
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';

import MainLayout from "../main/main";
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
              <Grid item xs={8}>
                <h2>Configuración Global</h2>
              </Grid>
              <Grid item xs={8}>
                <Divider />
                <FormControl 
                  required
                  sx={{ m:1 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">Visibilidad</FormLabel>
                  <RadioGroup
                    defaultValue="privado"
                    name="isPublic"
                  >
                    <FormControlLabel
                      control={
                        <Radio value={true} />
                      }
                      label="Publico"
                    />
                    <FormControlLabel 
                      control={
                        <Radio value={false} /> 
                      }
                      label="Privado"
                    />
                  </RadioGroup> 
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <Divider />
                <FormControl 
                  sx={{ m:1 }}
                  component="fieldset"
                  variant="standard"
                >
                  <FormLabel component="legend">
                    ¿Quieres permitir respuestas para este reto?
                  </FormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox name="allowAnswers" value={true} />
                      }
                      label="Permitir respuestas"
                    />
                </FormControl>
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
