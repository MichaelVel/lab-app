import { ReactElement } from "react";
import { Outlet } from "react-router";
import Header from '../header/Header';
import { AuthProvider } from '../context/auth';

export default function Root(): ReactElement {
    return (
    <div>
        <AuthProvider>
          <Header/>
          <main>
              <Outlet/> 
          </main>
        </AuthProvider>
    </div>
    );
}
