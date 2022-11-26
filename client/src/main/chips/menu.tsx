import { Avatar, Chip, ChipProps } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {Box, Stack} from '@mui/system';

type State = "blocked" | "active" | "inactive";

interface Props {
  state?: State;
  icon?: ReactElement;
  label?: string;
  href: string;
}

export default function MenuChip({state, icon, label, href}: Props) {
  let chipProps: any = {
    icon: icon,
    label: <Link to={href}>{label}</Link>,
    variant: 'filled',
    clickable: true,
    sx: { backgroundColor: 'rgba(0,0,0,0)' },
  };
  
  if (!state || state === 'inactive') {

  } else if (state === 'active') {
    chipProps = {
      ...chipProps, 
      sx: { backgroundColor: 'blueviolet' },
    };
  } else if (state === 'blocked') {
    chipProps = {
      ...chipProps,
      label: label,
      deleteIcon: <LockOutlinedIcon fontSize="small"/>,
      onDelete: ()=> {},
    };
  }

  return <Chip  {...chipProps as ChipProps}/>;

}
