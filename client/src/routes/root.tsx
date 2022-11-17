import { ReactElement, useState, useEffect } from "react";
import { Outlet } from "react-router";
import Header from '../header/Header';

const callBackendApi =  async () => {
  const response = await fetch('/express');
  console.log(response);
  const body = await response.json();
  
  if (response.status !== 200) { throw Error(body.message) }
  return body;
}

export default function Root(): ReactElement {
    const [data, setData] = useState("");

    useEffect( () => {
      callBackendApi()
        .then(res => setData(res.express))
        .catch(err => console.log(err))
    });

    return (
    <div>
        <Header/>
        <main>
            <Outlet/> 
            <p>{data}</p>
        </main>
    </div>
    );
}
