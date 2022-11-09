import {Grid, Paper} from '@mui/material';
import {Stack, Box} from '@mui/system';

import SectionHelp from './section-help';
import SectionTitle from './section-title';

interface SectionProps {
    name: string;
    description?: string;
    elements: JSX.Element;
};

export default function Section({name,description,elements}: SectionProps) {
    return (
        <Paper elevation={3}>
        <Grid container>
           <Grid item xs={12}>
                <Stack direction="row">
                <Box px={{paddingLeft: '1em', paddingTop: '0.8em'}}>
                    <SectionTitle name={name}/>
                </Box>
                {description && <SectionHelp description={description}/>}
                </Stack>
           </Grid> 
           <Grid item xs={12}>
                <Box px={{paddingLeft: '1em', paddingTop: '0.4em', paddingBottom: '0.7em'}}>
                    {elements}
                </Box>
           </Grid>
        </Grid>
        </Paper>
    );
}
