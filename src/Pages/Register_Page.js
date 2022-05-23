import React from "react";

import LoginButton from "../Services/login";
import LogoutButton from "../Services/logout";
import { useEffect } from 'react';
import { gapi } from 'gapi-script';


//client id given by the google Google Cloud Platform
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

      <div class="col-md-12 text-center ">
        <br></br>
        <div>
          <h3>Welcome to the official Barcelparts webpage!</h3>
          <br></br>
        </div>
        < div class="LoginPageButtons">
          <br></br>
          <h4>Please log in with google:</h4>
          <br></br>
          {/* <!-- call the buttons to login and logout with Google OAuth --> */}
          <LoginButton />
          <br></br>
          <LogoutButton />
          <br></br>
          <h4> Or visit us in: </h4>
          {/* Google maps information about the store location */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2986.5255358040135!2d-8.612765484569596!3d41.53621707925083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd24530465e45c5b%3A0xb21c57b050c53689!2sBarcelParts%20-%20Pe%C3%A7as%20e%20acess%C3%B3rios%20para%20autom%C3%B3veis!5e0!3m2!1spt-PT!2spl!4v1650558610448!5m2!1spt-PT!2spl"
            width="400" height="300" style={{ 'border': '0', 'margin-top': '20px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <br></br>
          <br></br>
        </div>
      </div>

    </React.Fragment>
  )



}

export default Register_Page;