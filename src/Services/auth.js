import Barcelparts from './Barcelparts.js'
import http from "../http-common";


//Function that will verify if the user is authenticated
export async function IsAuthenticated() {
    // Checks if there is a cookie with google auth token
    if (getCookie() != undefined) {
        //Gets the value of the cookie
        let token = getCookie();
        // Queries the google oauth api to get the user data
        return await http.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + token)
            .then(response => {
                //Creates the temporary User data
                var userData = {
                    "Email": response.data.email,
                    "User_FirstName": response.data.given_name,
                    "User_LastName": response.data.family_name,
                    "User_Image": response.data.picture,
                }
                //Queries the backend to search if the user exists in the database
                return Barcelparts.findUser(userData)
                    .then(response => {
                        //If the user exists return the user information
                        if (response.data != null) {
                            return [true, response.data]
                        }
                        else {
                            // If the user doesn't exist return false
                            return [false, response.data]
                        }
                    })
            })
    }
    // If there is no cookie return false
    else {
        return [false, undefined]
    }
}


//Function to get cookie from its name
export const getCookie = () => {
    let name = "userGoogleId=";
    let token;

    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            var separatedCookie = c.substring(name.length, c.length)

            //decrypt cookie
            var CryptoJS = require("crypto-js");
            var bytes = CryptoJS.AES.decrypt(separatedCookie, 'secret key 123');
            var decodedCookie = bytes.toString(CryptoJS.enc.Utf8);
            token = decodedCookie;
        }
    }
    return token
}