import {Divider, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useRouteLoaderData} from "react-router";

export default function InstructionsSection() {
  const challenge: any = useRouteLoaderData('challenge');

  return (
    <Box sx={{margin:"0em 2.5em"}}>
      <Typography variant="h5" gutterBottom >
        Vas a necesitar:
      </Typography>
      <Typography>
        <ul>
          {
            challenge.instructions.materials.map( (x: string, i: number) => {
              return <li key={i}>{x}</li>
            })
          }
        </ul> 
      </Typography>
      <Typography>
      </Typography>
      <Divider sx={{margin:"1em"}}/>
      <Typography variant="h5" gutterBottom >
        Pasos a seguir
      </Typography>
      <Typography>
        <ul>
          {
            challenge.instructions.steps.map( (x: string, i: number) => {
              return <li key={i}>{x}</li>
            })
          }
        </ul> 
      </Typography>
    </Box>
  );
}
