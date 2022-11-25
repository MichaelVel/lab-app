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

export function ChallengeNavBar({id, solved}: {id:string, solved?: boolean}) {
  const [inactive, active, blocked] = [
    'inactive' as State,
    'active' as State,
    'blocked' as State,
  ];

  const items = [
    { 
      icon: <HomeWorkOutlinedIcon />, 
      name: 'Resumen',
      href: `/challenges/${id}`,
      state: inactive,
    },
    { 
      icon: <AssignmentOutlinedIcon />, 
      name: 'Instrucciones',
      href: `/challenges/${id}/instructions`,
      state: inactive,
    },
    { 
      icon: <LanOutlinedIcon />, 
      name: 'Explicación',
      href: `/challenges/${id}/instructor-solution`,
      state: solved ? inactive : blocked,
    },
    { 
      icon: <ModeCommentOutlinedIcon />, 
      name: 'Comentarios',
      href: `/challenges/${id}/comments`,
      state: solved ? inactive : blocked,
    },
  ]
  
  return <InnerNavBar links={items} />
  
}
