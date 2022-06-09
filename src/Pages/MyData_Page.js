import React, { useState } from "react";
import Barcelparts from "../Services/Barcelparts";

import LoginButton from "../Services/login";
import LogoutButton from "../Services/logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';


function MyData_Page() {

  //client id given by the google Google Cloud Platform
  const clientId = "1040605938120-vj3qmpjvouj820vrum6lu196p1j1p2jp.apps.googleusercontent.com";

  useEffect(() => {

  });

  //this variable is useful if we need an access token for an api
  //var accessToken = gapi.auth.getToken().access_token;

  return (
    <React.Fragment>

      <p>qwerty</p>

    </React.Fragment>
  )



}

export default MyData_Page;