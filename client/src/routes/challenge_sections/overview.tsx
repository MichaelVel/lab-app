import {Divider, Typography} from "@mui/material";
import {Box} from "@mui/system";
import ChipsArray from "../../main/chips/list";

// provisional 
interface OverviewProps {
  mainTopic: string;
  labels: string[];
  description: string;
}

export default function OverviewSection() {
  return (
    <Box sx={{margin:"0em 2.5em"}}>
      <Typography variant="h5" gutterBottom >
        Descripción
      </Typography>
      <Typography>
        Esta sección contiene la descripción general del reto, aqui se da una
        breve introducción del tema principal y se explica como el experimento 
        esta relacionado con este de una manera general.
      </Typography>
      <Divider sx={{margin:"1em"}}/>
      <Typography variant="subtitle1">
       <strong>Conceptos a aprender: </strong>
      </Typography>
      <Typography gutterBottom>
        El concepto que vas a dominar con este experimento es: 
      </Typography>
      <ChipsArray data={[
        {key:1, label:"Tema"},
        {key:2, label:"Tema"},
        {key:3, label:"Tema"},
        {key:4, label:"Tema"},
        ]}
      />
    </Box>
  );
}
