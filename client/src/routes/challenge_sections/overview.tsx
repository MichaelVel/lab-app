import {Divider, Typography} from "@mui/material";
import {Box} from "@mui/system";
import ChipsArray from "../../main/chips/list";
import {useRouteLoaderData} from "react-router";

export default function OverviewSection() {
  const challenge: any = useRouteLoaderData('challenge');

  return (
    <Box sx={{margin:"0em 2.5em"}}>
      <Typography variant="h5" gutterBottom >
        Descripción
      </Typography>
        {challenge.context.description}
      <Typography>
      </Typography>
      <Divider sx={{margin:"1em"}}/>
      <Typography variant="subtitle1">
       <strong>Conceptos a aprender: </strong>
      </Typography>
      <Typography gutterBottom>
        El concepto que vas a dominar con este experimento es:<br/>
        <Box sx= {{paddingLeft: '1em', paddingTop: '1em', paddingBottom: '1em' }}>
          {challenge.context.mainTopic}
        </Box>
      </Typography>
      <ChipsArray data={ challenge.context.labels.map(
        (x:string,i: number) => { return {key:i, label:x}})
        }
      />
    </Box>
  );
}
