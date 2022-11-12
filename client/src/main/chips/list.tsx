import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import {Box} from '@mui/system';

interface ChipData {
  key: number;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray({data}: {data: Array<ChipData>}) {
  const [chipData, setChipData] = React.useState<readonly ChipData[]>(data);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
    >
      {chipData.map((data) => {
        return (
          <ListItem key={data.key}>
            <Chip
              label={data.label}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
