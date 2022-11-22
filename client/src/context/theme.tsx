import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import {ThemeOptions} from '@mui/material';

const theme = createTheme() as ThemeOptions;

export const mainTheme = createTheme(theme, {
  palette: {
    primary: { main: '#8d8ba3'},
    secondary:  { main: '#302f45' },
    success:  { main: '#60a469' },
    warning:  { main: 'dd9431' },
    danger:  { main: '#f44336' }
  },
});
