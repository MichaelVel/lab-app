import { ChangeEvent, useState } from 'react';
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
  Typography,
} from '@mui/material';

import {
  Form,
  ActionFunctionArgs, 
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";

import MainLayout from "../main/main";
import Section from "../main/section";
import InputChipsArray from "../main/inputs/chip-array";
import ListInput from "../main/inputs/input-list";
import { Challenge } from "../context/challenge";
import { User } from "../context/user";
import {useAuth} from '../context/auth';
import UploadButtons from '../main/inputs/file-input';

export async function loader({params}: LoaderFunctionArgs) {
  const response = await fetch(`/api/challenges/${params.challengeId}`, {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
  });
  
  const body = await response.json();
  if (response.status !== 200) { 
    alert(body.message);
    return;
  }

  return body;
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
  const {user} = useAuth();
  const fetchedChallenge: any = useLoaderData();
  const [challenge, setChallenge] = useState(
    fetchedChallenge ? fetchedChallenge : getChallenge(user)
  );
  const navigate = useNavigate();
  const { challengeId } = useParams();

  async function handleSave() {
  if (!challengeId) {
    handleSubmition();
    return;
  }
    const response = await fetch(`/api/challenges/${challengeId}`, {
      method: "PUT",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': !user ? 'notToken' : 'Bearer ' + user.token
      },
      body: JSON.stringify(challenge),
    });
    const body = await response.json();
    
    if (response.status !== 200) { 
      alert(body.message);
      return;
    }
  }

  async function handleSubmition() {
    if (challengeId) {
      handleSave();
      return;
    }
    const response = await fetch('/api/challenges', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': !user ? 'notToken' : 'Bearer ' + user.token
      },
      body: JSON.stringify(challenge),
    });
    const body = await response.json();
    
    if (response.status !== 201) { 
      alert(body.message);
      return;
    }

    navigate(`/users/${user?.name}/create-challenge/${body._id}`)
  }

  function updateForm(name: string, value: any, subcollection?:string) {
    if (subcollection) {
      const sub: any = challenge[subcollection as keyof Challenge];
      setChallenge({...challenge, [`${subcollection}`]: {
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
                      subcollectionname="context"
                      name="mainTopic"
                      value={challenge.context.mainTopic}
                      callback={updateForm}
                    />
                    <h3>Otros Temas</h3> 
                    <InputChipsArray 
                      value={challenge.context.labels}
                      subcollectionname="context"
                      callback={updateForm}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{padding:'0.8em'}}>
                    <h3>Descripción</h3> 
                    <ControlledTextField 
                      size="small"
                      label="Descripción"
                      subcollectionname="context"
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
                      subcollectionname='instructions'
                      value={challenge.instructions.materials}
                      callback={updateForm}
                    />
                  </Grid>
                  <Grid item xs={6} sx={{padding:'0.8em'}}>
                    <h3>Instrucciones</h3> 
                    <ListInput 
                      listName="Pasos del experimento"
                      inputName='steps'
                      subcollectionname='instructions'
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
                      name="submition"
                      subcollectionname='instructions'
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
                    <Typography sx={{ padding: '0em 0.3em', textAlign: 'justify'}}>
                    En esta sección el maestro debe subir
                    la explicación del experimento: el que
                    el como y un desarrollo breve del tema
                    principal. Esta explicación puede estar 
                    en un formato PDF o JPEG.
                    </Typography> 
                  </Grid>
                  <Grid item xs={6} sx={{padding:'0.8em'}}>
                    <UploadButtons 
                      name="resource"
                      subcollectionname='explanation'
                      value={null}
                      callback={updateForm}
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


function ControlledTextField(props: TextFieldProps & {callback: Function, subcollectionname?: string}) {
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
          props.subcollectionname 
            ? props.callback(e.currentTarget.name,text,props.subcollectionname)
            : props.callback(e.currentTarget.name,text)
        }}
    />
  );
}

