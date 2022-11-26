import { ReactElement } from "react";
import { Outlet } from "react-router";
import Header from '../header/Header';
import { AuthProvider } from '../context/auth';
import {ThemeProvider} from '@mui/system';
import {mainTheme} from '../context/theme';

export default function Root(): ReactElement {
    return (
    <div>
      <ThemeProvider theme={mainTheme}>
        <AuthProvider>
          <Header/>
          <main>
              <Outlet/> 
          </main>
        </AuthProvider>
      </ThemeProvider>
    </div>
    );
}
