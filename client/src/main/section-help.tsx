import {Box, Tooltip} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import * as React from 'react';

interface Props {
    description: string,
    children?: React.ReactNode,
}

export default function SectionHelp(props: Props) {
    return (
    <Tooltip title={props.description} placement="right-start" arrow>
       <Box sx={{fontSize: '1em', paddingTop: 1/3, color: "blue"}}>
            <HelpOutlineIcon fontSize="inherit" color='inherit'/>
       </Box>
    </Tooltip>
    );
}
