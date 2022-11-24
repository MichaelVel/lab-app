import { ChangeEvent, FormEvent, useState } from 'react';
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
  TextFieldProps,
} from '@mui/material';

import {
  Form,
  ActionFunctionArgs, 
  LoaderFunctionArgs,
  useSubmit,
} from "react-router-dom";

import MainLayout from "../main/main";
import Section from "../main/section";
import InputChipsArray from "../main/inputs/chip-array";
import ListInput from "../main/inputs/input-list";
import { Challenge } from "../context/challenge";
import { User } from "../context/user";
import {useAuth} from '../context/auth';

export async function loader({request, params}: LoaderFunctionArgs) {
  // got an idea to use this with two kinds of urls 
  //    -/users/:userId/create-challenge
  //    -/users/:userId/cerate-challenge/challengeId
  if (!params.userId) { return; }
  if (!params.challengeId) {
    return new Challenge(params.userId);
  }
  // -fetch data

}

export async function action({request}: ActionFunctionArgs) {
  const data = await request.formData();
}


function getChallenge(user: User|undefined) {
  if (!user) {         // In router exist a guard to prevent a unauthorized 
    user = new User(); // user to access this route, so this clause is never 
  }                    // true and only exist to satisfy the compiler.  
  return new Challenge(user._id);
}


export default function CreateChallenge() {
  let {user} = useAuth();
  const [challenge, setChallenge] = useState(getChallenge(user));

  async function handleSave(event: any) {
  if (!challenge._id) {
    //handleSubmition(event)
    console.log(challenge);
    return;
  }
    const response = await fetch(`/api/challenges/${challenge._id}`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify(challenge),
    });
    const body = await response.json();
    
    if (response.status !== 200) { 
      alert(body.message);
      return;
    }
  }

  async function handleSubmition(event: any) {
    console.log(JSON.stringify(challenge))
    const response = await fetch('/api/challenges', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify(challenge),
    });
    const body = await response.json();
    
    if (response.status !== 200) { 
      alert(body.message);
      return;
    }
  }

  function updateForm(name: string, value: any, subCollection?:string) {
    if (subCollection) {
      const sub: any = challenge[subCollection as keyof Challenge];
      setChallenge({...challenge, [`${subCollection}`]: {
          ...sub, [`${name}`]: value}})
    } else {
      setChallenge({...challenge, [`${name}`]: value})
    }
  }

  return (
  <Form method="post">
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
                  onChange={(event:any) => {
                    setChallenge(
                      {...challenge, isPublic: event.target.value === "true" }
                    )
                  }}
                  value={challenge.isPublic}
                >
                  <FormControlLabel
                    control={ <Radio value={true} /> }
                    label="Publico"
                  />
                  <FormControlLabel 
                    control={ <Radio value={false} /> }
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
                      <Checkbox name="allowAnswers"/>
                    }
                    label="Permitir respuestas"
                    checked={challenge.allowAnswers}
                    onChange={(event:any) => {
                      setChallenge(
                        {...challenge,
                         allowAnswers: event.target.checked}
                      )
                    }}
                  />
              </FormControl>
            </Grid>
            <Grid item xs= {8}>
              <ButtonGroup orientation="vertical">
                <Button 
                  type="button"
                  id="saveButton"
                  onClick={handleSave}
                >
                  Guardar Cambios
                </Button>
                <Button 
                  variant="contained"
                  type="button"
                  id="submitButton"
                  onClick={handleSubmition}
                >
                  Submit
                </Button>
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
          sx={{
            margin: '1em 0em',
          }}
        >
          <Grid item xs={10}>
            <Section
              name="¿Cual es el nombre de tu reto?"
              elements={
                <ControlledTextField
                  size="small"
                  label="Titulo"
                  name="name"
                  value={challenge.name}
                  callback={updateForm}
                />
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
                    <ControlledTextField 
                      size="small" 
                      label="Titulo"
                      name="mainTopic"
                      value={challenge.context.mainTopic}
                      callback={updateForm}
                    />
                    <h3>Otros Temas</h3> 
                    <InputChipsArray 
                      value={challenge.context.labels}
                      callback={updateForm}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{padding:'0.8em'}}>
                    <h3>Descripción</h3> 
                    <ControlledTextField 
                      size="small"
                      label="Descripción"
                      multiline
                      minRows={6}
                      fullWidth
                      name="description"
                      value={challenge.context.description}
                      callback={updateForm}
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
                      inputName='materials'
                      subCollectionName='instructions'
                      value={challenge.instructions.materials}
                      callback={updateForm}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{padding:'0.8em'}}>
                    <h3>Instrucciones</h3> 
                    <ListInput 
                      listName="Pasos del experimento"
                      inputName='steps'
                      subCollectionName='instructions'
                      value={challenge.instructions.steps}
                      callback={updateForm}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{padding:'0.8em'}}>
                    <h3>Instrucciones de entrega</h3> 
                    <ControlledTextField 
                      size="small"
                      label="Descripción"
                      multiline
                      minRows={4}
                      fullWidth
                      name="submitInstructions"
                      subCollectionName='instructions'
                      value={challenge.instructions.submition}
                      callback={updateForm}
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


function ControlledTextField(props: TextFieldProps & {callback: Function, subCollectionName?: string}) {
  const [text, setText] = useState(props.value);
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.currentTarget.value);
  }

  return (
    <TextField 
        {...props}
        value={text}
        onChange={handleChange}
        onBlur={(e:any) => {
          props.subCollectionName 
            ? props.callback(e.currentTarget.name,text,props.subCollectionName)
            : props.callback(e.currentTarget.name,text)
        }}
    />
  );
}

