import MainLayout from "../main/main";
import SearchBar from "../main/searchbar";
import FilterSearch from "../main/filter";
import {Grid, Box} from "@mui/material";

export default function SearchChallenge() {
    return <MainLayout 
                sideBar={
                <Box sx={{
                    paddingTop: '2em',
                }}
                >
                    <Grid container
                        justifyContent="center"
                        spacing={1}
                    >   
                        <Grid item xs={8}>
                            <h2>Buscar Retos</h2>
                        </Grid>
                        <Grid item xs={8}>
                            <SearchBar />
                        </Grid>
                        <Grid item xs= {8}>
                            <FilterSearch />
                        </Grid>
                    </Grid>
                </Box>
                }
                main={<div></div>} />;
}
