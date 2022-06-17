import React, { useEffect, useState, useRef } from "react";
import Barcelparts from "../Services/Barcelparts";
import {setJwtToken, setRefreshToken} from '../Services/authentication'

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function Login_Page() {
    const errRef = useRef();

    const [Email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [Password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(Email));
    }, [Email])

    useEffect(() => {
        setErrMsg('');
    }, [Email, Password])

    async function loginUser(event) {
        event.preventDefault()

        const user = {
            Email: Email,
            Password: Password
        }

        await Barcelparts.loginUser(JSON.stringify(user))
        .then (response => {
            setJwtToken(response.data.accessToken)
            setRefreshToken(response.data.refreshToken)
            window.location.href = "/";
        })
        .catch (err => {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('User not found');
            }else if (err.response?.status === 403) {
                setErrMsg('Wrong Password');
            } else {
                setErrMsg('Registration Failed')
            }
        })
    }

    return (
        <div className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <svg height="500px" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            focusable="false">
                            <image height="100%" width="100%" xlinkHref=".\Assets\Images\voiture.svg" style={{ "mixBlendMode": "multiply" }} x="0" y="0" />
                        </svg>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={loginUser}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-facebook-f"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-twitter"></i>
                                </button>

                                <button type="button" className="btn btn-primary btn-floating mx-1">
                                    <i className="fab fa-linkedin-in"></i>
                                </button>
                            </div>

                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Or</p>
                            </div>
                            <p ref={errRef} className={errMsg ? "errmsg" : "d-none"} aria-live="assertive">{errMsg}</p>

                            <div className="form-outline mb-2">
                                <input
                                    value={Email}
                                    required
                                    onChange={e => { setEmail(e.target.value) }}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    type="email"
                                    id="email" name="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid Email" />
                                <label className="form-label" htmlFor="Email">Email</label>
                            </div>

                            <div className="form-outline mb-2">
                                <input
                                    value={Password}
                                    required
                                    onChange={e => { setPassword(e.target.value) }}
                                    aria-invalid={validPwd ? "false" : "true"}
                                    type="password"
                                    id="Password"
                                    name="Password"
                                    className="form-control form-control-lg"
                                    placeholder="Enter Password" />
                                <label className="form-label" htmlFor="Password">Password</label>
                            </div>


                            <div className="d-flex justify-content-between align-items-center">
                                {/* <!-- Checkbox --> */}
                                <div className="form-check mb-0">
                                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                                    <label className="form-check-label" htmlFor="form2Example3">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#!" className="text-body">Forgot password?</a>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{ "paddingLeft": "2.5rem", "paddingRight": "2.5rem" }}>Login</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/Register_Page"
                                    className="link-danger" style={{"color" :"#00a1b6"}}>Register</a></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Login_Page;