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

interface Props {
  listName?: string;
  inputName: string;
  subCollectionName: string;
  value: string[];
  callback: Function;
}
export default function ListInput(props: Props) {
  const [textInput, setTextInput] = React.useState<string>();
  const [listData, setListData] = React.useState<string[]>(props.value);

  React.useEffect(() => {
    props.callback(props.inputName,listData,props.subCollectionName)
  }, [listData]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDelete = (selectedIndex: number) => {
    setListData((data: string[]) => data.filter(
        ({}, index: number) => index !== selectedIndex)
    );
  };

  const handleChange = (evt: any ) => {
    setTextInput(evt.target.value);
  };

  const handleListChange = (evt: any, index:number) => {
    const newListData = listData.map( (x,i) => index === i ? evt.target.value : x);
    setListData(newListData);
  }
    

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
                                fullWidth 
                                multiline 
                                size="small"
                                name={props.inputName}
                                value={data}
                                variant="filled"
                                onChange={(e:any) => handleListChange(e,index)}
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
