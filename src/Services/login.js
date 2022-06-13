import { GoogleLogin } from 'react-google-login';
import ProductDataService from "../Services/Barcelparts.js"
import React from "react";
import http from "../http-common";

const clientId = "1040605938120-vj3qmpjvouj820vrum6lu196p1j1p2jp.apps.googleusercontent.com";

function Login() {

    // function that verifies if the user exists and if it doesn't creates a new user
    const verifyIfUserExists = (userData) => {
        ProductDataService.findUser(userData)
            .then(response => {
                //console.log(response.data)
                //Verifies if the user exists in the database
                if (response.data == null) {
                    //If the user doesn't exist create a new user in the database              
                    ProductDataService.createUser(userData)
                        .then(response => {
                            //Receives the response and displays if the user was created or not
                            console.log(response.data)
                        })
                        //If there is an error catches it and displays it in the console
                        .catch(e => {
                            console.log(e);
                        });
                }
            })
            //If there is an error catches it and displays it in the console
            .catch(e => {
                console.log(e);
            });
    }

    const onSuccess = (res) => {
        //we receive a token that we need to validate/decode to obtain the user info
        //console.log("received token = " + res.tokenId)

        // TODO this should be done by the server I believe, not in the frontend
        //send the token to google to be decoded
        http.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + res.tokenId)
            .then(response => {

                //use the decoded token to get the user info
                var userData = {
                    "Email": response.data.email,
                    "User_FirstName": response.data.given_name,
                    "User_LastName": response.data.family_name,
                    "User_Image": response.data.picture,
                }

                verifyIfUserExists(userData);
                console.log("LOGIN SUCCESS!")

                var CryptoJS = require("crypto-js");
                //Encrypt THE COOKIE and add it to the browser
                document.cookie = "userGoogleId=" + CryptoJS.AES.encrypt(res.tokenId, 'secret key 123').toString();
                //window.location.href = "/";
                //this line would redirect the user to the main page after login, but the  it doesn't create a user if it doesn't exist
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