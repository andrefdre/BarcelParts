import React from "react";

import LoginButton from "../Services/login";
import LogoutButton from "../Services/logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';

const clientId = "1040605938120-vj3qmpjvouj820vrum6lu196p1j1p2jp.apps.googleusercontent.com";


function Register_Page() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    };

    gapi.load('client:auth2', start);
  });

  //this variable is useful if we need an access token for an api
  //var accessToken = gapi.auth.getToken().access_token;

  return (
    <React.Fragment>
      {/* <!-- Main Content of the Webpage --> */}
      {/* <!-- Items that will not be displayed with all width of the Page --> */}
      <div className="container-md">
        <form>
          <input type="text" placeholder="Name"></input>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="password"></input>
        </form>
      </div>
      <LoginButton />
      <LogoutButton />
    </React.Fragment>
  )

  

}

export default Register_Page;