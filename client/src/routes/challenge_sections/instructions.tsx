import {Divider, Typography} from "@mui/material";
import {Box} from "@mui/system";
import ChipsArray from "../../main/chips/list";

export default function InstructionsSection() {
  return (
    <Box sx={{margin:"0em 2.5em"}}>
      <Typography variant="h5" gutterBottom >
        Vas a necesitar:
      </Typography>
      <Typography>
      </Typography>
      <Divider sx={{margin:"1em"}}/>
      <Typography variant="h5" gutterBottom >
        Pasos a seguir
      </Typography>
    </Box>
  );
}
