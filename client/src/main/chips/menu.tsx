import { Avatar, Chip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {ReactElement} from 'react';
import {Box, Stack} from '@mui/system';

type State = "blocked" | "active" | "inactive";
interface Props {
  state?: State;
  icon?: ReactElement;
  label?: string;
  href: string;
}

export default function MenuChip({state, icon, label, href}: Props) {
  if (!state || state === "inactive") {
   return <Chip 
      icon= {icon} 
      label={label} 
      variant="filled"
      component="a"
      href={href}
      clickable
      sx={{ 
        backgroundColor: "rgba(0,0,0,0)" 
      }}
    />;
  }

  if (state === "active") {
    return <Chip 
      icon={icon}
      label={label}
      variant="filled" 
      component="a"
      href={href}
      clickable
      sx={{ 
        backgroundColor: "blueviolet" 
      }}
    />;
  }

  return <Chip 
        icon= {icon} 
        label={label} 
        variant="filled"
        deleteIcon={<LockOutlinedIcon fontSize="small"/>}
        clickable
        onDelete={()=> {}}
        sx={{ 
          backgroundColor: "rgba(0,0,0,0)" 
        }}
      />;
}
