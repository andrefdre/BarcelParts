import Barcelparts from "./Barcelparts"

// Short duration JWT token (5-10 min)
export function getJwtToken() {
    return sessionStorage.getItem("jwt")
}

export function setJwtToken(token) {
    sessionStorage.setItem("jwt", token)
}

// Longer duration refresh token (30-60 min)
export function getRefreshToken() {
    return sessionStorage.getItem("refreshToken")
}

export function setRefreshToken(token) {
    sessionStorage.setItem("refreshToken", token)
}

export function removeTokens() {
    sessionStorage.removeItem("refreshToken")
    sessionStorage.removeItem("jwt")
}

//Function that will verify if the user is authenticated
export async function IsAuthenticated() {

        const accessToken=getJwtToken()
       if (accessToken != null){ 
        
                //Queries the backend to search if the user exists in the database
                return await Barcelparts.getUser(accessToken)
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
                    .catch(async err=>{
                        if(err.response?.status === 403) {
                            const data ={
                               token: getRefreshToken()
                            }
                            return await Barcelparts.getNewToken(JSON.stringify(data))
                            .then(response => {
                                setJwtToken(response.data.accessToken)
                            })
                            .catch(e=>{
                                return [false, undefined] 
                            })
                        }
                        else {
                        return [false, undefined]
                    }
                    })
    }
    // If there is no cookie return false
    else {
        return [false, undefined]
    }
}