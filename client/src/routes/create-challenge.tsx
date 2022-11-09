import MainLayout from "../main/main";
import {Grid, Box, Button, Divider, ButtonGroup} from "@mui/material";

import { AllowAnswers , VisibilityOption} from '../main/creation-config';

export default function CreateChallenge() {
    return (
      <form>
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
                        <Grid item xs={9}>
                            <h2>Configuración Global</h2>
                        </Grid>
                        <Grid item xs={8}>
                            <Divider />
                            <VisibilityOption />
                        </Grid>
                        <Grid item xs={8}>
                            <Divider />
                            <AllowAnswers />
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
                <div></div>
            }
        />
      </form>
    );
}
