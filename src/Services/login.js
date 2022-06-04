import { GoogleLogin } from 'react-google-login';
import ProductDataService from "../Services/Barcelparts.js"
import React from "react";
import http from "../http-common";

const clientId = "1040605938120-vj3qmpjvouj820vrum6lu196p1j1p2jp.apps.googleusercontent.com";

function Login() {

    const verifyIfUserExists = (userData) => {
        ProductDataService.findUser(userData)
            .then(response => {
                if (response.data == null) {              //if the user doesn't exist, we create it
                    ProductDataService.createUser(userData)
                }
            })

            //If there is an error catches it and displays it in the console
            .catch(e => {
                console.log(e);
            });
    }

    const onSuccess = (res) => {


        //we receive a token that we need to validate/decode to obtain the user info
        console.log("received token = " + res.tokenId)

        // TODO this should be done by the server I believe, not in the frontend
        //send the token to google to be decoded
        http.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + res.tokenId)
            .then(response => {

                console.log("here we go")
                console.log(response.data)

                //use the decoded token to get the user info
                var userData = {
                    "_id": response.data.googleId,
                    "User_FirstName": response.data.given_name,
                    "User_LastName": response.data.family_name,
                    "User_Image": response.data.picture,
                    "Email": response.data.email
                }

                verifyIfUserExists(userData);
                console.log("LOGIN SUCCESS! CUrrent user: ", userData)

                var CryptoJS = require("crypto-js");
                //Encrypt THE COOKIE and add it to the browser
                document.cookie = "userGoogleId=" + CryptoJS.AES.encrypt(userData.googleId, 'secret key 123').toString();
                //window.location.href = "/";


            })
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res)
        alert("LOGIN FAILED! \n Please try again... ")

    }

    return (
        <div id="signInButton">
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                responseType='id_token'
            />
        </div>
    )
}

export default Login;