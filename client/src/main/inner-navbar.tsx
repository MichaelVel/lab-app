import { SvgIconProps } from "@mui/material";
import {ReactElement} from "react";

import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';

import MenuChip from "./chips/menu";
import {Stack} from "@mui/system";

type State = "blocked" | "active" | "inactive";

interface MenuItem {
  icon: ReactElement<SvgIconProps>;
  name: string;
  href: string;
  state: State;
}

interface Props {
  links: Array<MenuItem>;
}

export default function InnerNavBar({links}: Props) {
  return (
    <Stack 
      spacing={1}
      direction="row"
      justifyContent="space-evenly"
      sx={{flexWrap: 'wrap'}}
    >
      {links.map( ({icon, name, href, state}) => {
        return <MenuChip state={state} label={name} icon={icon} href={href} /> 
      })}    
    </Stack>
  );
}

export function ChallengeNavBar({id}: {id:string}) {
  const items = [
    { 
      icon: <HomeWorkOutlinedIcon />, 
      name: 'Resumen',
      href: `/challenges/${id}`,
      state: 'active' as State,
    },
    { 
      icon: <AssignmentOutlinedIcon />, 
      name: 'Instrucciones',
      href: `/challenges/${id}/instructions`,
      state: 'inactive' as State,
    },
    { 
      icon: <LanOutlinedIcon />, 
      name: 'Explicación',
      href: `/challenges/${id}/instructor-solution`,
      state: 'blocked' as State,
    },
    { 
      icon: <ModeCommentOutlinedIcon />, 
      name: 'Comentarios',
      href: `/challenges/${id}/comments`,
      state: 'blocked' as State,
    },
  ]
  
  return <InnerNavBar links={items} />
  
}
