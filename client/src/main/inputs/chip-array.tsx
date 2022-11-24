import * as React from 'react';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {
    Chip,
    IconButton,
    Paper,
} from '@mui/material';

import VariableSizeInput from './sized-input';

interface ChipData {
  key: number;
  label: string;
}

interface Props {
  value: string[];
  subCollectionName: string;
  callback: Function;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


export default function InputChipsArray({value, callback, subCollectionName}: Props) {
  const [chipData, setChipData] = React.useState<ChipData[]>(
      value.length === 0
      ? [{ key: 0, label: 'Nuevo Tema' }]
      : value.map( (x:string, i:number) => { return { key: i, label: x}})
    );

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleClick = () => {
    let newChip = { key: chipData.length + 1, label: 'Nuevo Tema'};
    let newData = [...chipData, newChip];
    setChipData(newData);
  };

  const handleChange = (key: number, value: string) => {
    let newData =  chipData.map( x => x.key === key ? { key: key, label: value } : x);
    setChipData(newData);
  }

  React.useEffect(() => {
    callback("labels", chipData.map(x => x.label),subCollectionName)
  }, [chipData]);

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;
        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={<VariableSizeInput 
                name="labels" 
                value={data.label}
                dataKey={data.key}
                callback={handleChange}
              />}
              onDelete={handleDelete(data)}
            />
          </ListItem>
        );
      })}
            <IconButton onClick={handleClick}>
                <AddIcon></AddIcon>
            </IconButton>
    </Paper>
  );
}
