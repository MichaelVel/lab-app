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

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


export default function InputChipsArray() {
  const [chipData, setChipData] = React.useState<ChipData[]>([
    { key: 0, label: 'Nuevo Tema' },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  const handleClick = () => {
    let newChip = { key: chipData.length + 1, label: 'Nuevo Tema'};
    let newData = [...chipData, newChip];
    setChipData(newData);
  };

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
              label={<VariableSizeInput name="topics" value={data.label} />}
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
