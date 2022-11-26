import {useRef} from "react";
import {useLoaderData} from "react-router";
import {Link, LinkProps} from "react-router-dom";

import {
  Grid,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';

import MainLayout from "../main/main";
import SearchBar from "../main/searchbar";
import FilterSearch from "../main/filter";

export async function loader() {
  const response = await fetch(`/api/challenges`, {
    method: "GET",
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

export async function action() {
  // unimplemented
}

export default function SearchChallenge() {
  const data: any = useLoaderData(); 

  return (
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
      main={
      <Box 
        sx={{margin: '1em', paddingTop: '2em'}}
      >
        <Grid 
          container
          justifyContent="center"
          spacing={1}
        >
          <Grid item xs={8}>
            <Paper sx={{padding: '1em'}}>
            <Typography variant="h4">
              Retos disponibles
            </Typography>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
            <List>
              {data.map((x:any, i:number) => {
                return (
                  <ListItem key={i}>
                    <LinkItemButton to={`/challenges/${x._id}`}>
                      {x.name}
                    </LinkItemButton>
                  </ListItem>
                );
              })
              }
            </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      } 
    />
  );
}

function LinkItemButton(props: LinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = () => {
    linkRef.current?.click()
  };
  
  return (
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <Link {...props} ref={linkRef}>{props.children}</Link>
    </ListItemButton>
  );
}

