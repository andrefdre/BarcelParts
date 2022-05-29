import { GoogleLogin } from 'react-google-login';
import ProductDataService from "../Services/Barcelparts.js"
import React from "react";

const clientId = "1040605938120-vj3qmpjvouj820vrum6lu196p1j1p2jp.apps.googleusercontent.com";

function Login() {

    const verifyIfUserExists = (userData) => {
        ProductDataService.findUser(userData)
            .then(response => {
                //Console log for debugging and developing
                console.log(response.data)
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

        var userData = {
            "_id": res.profileObj.googleId,
            "User_FirstName": res.profileObj.givenName,
            "User_LastName": res.profileObj.familyName,
            "User_Image": res.profileObj.imageUrl,
            "Email": res.profileObj.email
        }

        verifyIfUserExists(userData);
        console.log("LOGIN SUCCESS! CUrrent user: ", res.profileObj)

        var CryptoJS = require("crypto-js");
        //Encrypt THE COOKIE and add it to the browser
        document.cookie = "userGoogleId=" + CryptoJS.AES.encrypt(res.profileObj.googleId, 'secret key 123').toString();
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
            />
        </div>
    )
}

export default Login;