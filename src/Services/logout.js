import { GoogleLogout } from 'react-google-login';

const clientId = "1040605938120-vj3qmpjvouj820vrum6lu196p1j1p2jp.apps.googleusercontent.com";

const onSuccess = () => {
    console.log("Log out successfull!");
}


function Logout(){

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