import { GoogleLogout } from 'react-google-login';
import React from "react";

const clientId = "1040605938120-vj3qmpjvouj820vrum6lu196p1j1p2jp.apps.googleusercontent.com";

const onSuccess = () => {
    console.log("Log out successfull!");
}


function Logout() {

    document.cookie = "userGoogleId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;