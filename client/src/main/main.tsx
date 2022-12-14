import {Box, Grid} from "@mui/material";
import { ReactElement } from "react";

interface Props {
    sideBar: ReactElement;    
    main: ReactElement;
}

export default function MainLayout(props: Props): ReactElement {
    return (
    <Grid container>
      <Grid item xs={4} md={3}>
        <Box sx={{
          backgroundColor: 'rgba(var(--light-shades), 1)',
          minHeight: '100vh',
        }}
        >
          {props.sideBar}
        </Box>
      </Grid> 
      <Grid item xs={8} md={9}>
        <Box sx={{
          backgroundColor: 'rgba(var(--light-shades), 0.3)',
          minHeight: '100vh',
        }}
        >
          {props.main} 
        </Box>
      </Grid> 
    </Grid>
    );
}  
