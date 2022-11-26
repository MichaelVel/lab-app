import {Divider, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useRouteLoaderData} from "react-router";

export default function ExplanatioSection() {
  const challenge: any = useRouteLoaderData('challenge');
  
  return (
    <Box sx={{margin:"0em 2.5em"}}>
      <Typography variant="h5" gutterBottom >
        Descripción
      </Typography>
      <Typography>
        {challenge.context.description}
      </Typography>
      <Divider sx={{margin:"1em"}}/>
      <Typography variant="subtitle1">
       <strong>Conceptos a aprender: </strong>
      </Typography>
      <Typography gutterBottom>
        El concepto que vas a dominar con este experimento es: 
      </Typography>
    </Box>
  );
}
