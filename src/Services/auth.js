import Barcelparts from './Barcelparts.js'
import http from "../http-common";

export async function IsAuthenticated() {
    if (getCookie() != undefined) {
        let token = getCookie();
        return await http.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=` + token)
            .then(response => {
                var userData = {
                    "Email": response.data.email,
                    "User_FirstName": response.data.given_name,
                    "User_LastName": response.data.family_name,
                    "User_Image": response.data.picture,
                }

                return Barcelparts.findUser(userData)
                    .then(response => {
                        if (response.data != null) {
                            return [true, response.data]
                        }
                        else {
                            return [false, response.data]
                        }
                    })
            })
    }
    else {
        return [false, undefined]
    }
}


//function to get cookie from its name
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