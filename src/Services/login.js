import { GoogleLogin } from 'react-google-login';
import ProductDataService from "../Services/Barcelparts.js"

const clientId = "1040605938120-vj3qmpjvouj820vrum6lu196p1j1p2jp.apps.googleusercontent.com";

function Login() {

    const verifyIfUserExists = (userData) => {
        console.log(ProductDataService.findUser(userData));
    }

    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! CUrrent user: ", res.profileObj)

        var userData = {
            "_id": res.profileObj.googleId,
            "User_FirstName": res.profileObj.givenName,
            "User_LastName": res.profileObj.familyName,
            "User_Image": res.profileObj.imageUrl,
            "Email": res.profileObj.email
        }

        verifyIfUserExists(userData)
/*
        console.log(ProductDataService.createUser(userData));

        */
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res)
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