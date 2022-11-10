import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    List,
    ListItem,
    IconButton,
    Button,
    Paper,
    ListItemText,
    Grid,
    TextField,
} from '@mui/material';

export default function ListInput(props: {listName?: string}) {
  const [textInput, setTextInput] = React.useState<string>();
  const [listData, setListData] = React.useState<string[]>([
    "new", "none", "send",
  ]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDelete = (selectedIndex: number) => {
    setListData((data: string[]) => data.filter(
        ({}, index: number) => index !== selectedIndex)
    );
    console.log(listData);
  };

  const handleChange = (evt: any ) => {
    setTextInput(evt.target.value);
  };

  const handleClick = () => {
    if (!textInput) { return; }
    setListData([...listData, textInput]);
    setTextInput('');

    if (inputRef.current) {
        inputRef.current.value='';
    }

  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    > 
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8}>
          <TextField 
            inputRef={inputRef}
            onChange={handleChange} 
            fullWidth size='small'
            multiline
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleClick}>
            añadir
          </Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
            <List sx={{ paddingTop: "1em", paddingLeft: "0.5em" }} >
                <ListItemText 
                    primary={ 
                        <strong>
                          {props.listName ? props.listName : 'Lista'}
                        </strong>
                    } 
                />
                {listData.map((data,index) => {
                    return (
                    <ListItem 
                        key={index}
                        secondaryAction={
                        <IconButton edge="end" onClick={() => handleDelete(index)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        }
                    >
                        <ListItemText primary={
                            <TextField 
                                disabled 
                                fullWidth 
                                multiline 
                                size="small"
                                value={data}
                                variant="filled"
                            />}
                        />
                    </ListItem>
                    );
                })}
            </List>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Paper>
  );
}
