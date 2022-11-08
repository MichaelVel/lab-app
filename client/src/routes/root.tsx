import { ReactElement } from "react";

import { Outlet } from "react-router";

import Header from '../header/Header';

export default function Root(): ReactElement {
    return (
    <div>
        <Header/>
        <main>
            <Outlet/> 
        </main>
    </div>
    );
}
