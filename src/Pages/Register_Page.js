import React, { useEffect, useState, useRef } from "react";
import Barcelparts from "../Services/Barcelparts";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register_Page() {
    const emailRef = useRef();
    const errRef = useRef();

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');

    const [Email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


    const [Password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [PasswordMatch, setPasswordMatch] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(Email));
    }, [Email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(Password));
        setValidMatch(Password === PasswordMatch);
    }, [Password, PasswordMatch])

    useEffect(() => {
        setErrMsg('');
    }, [Email, Password, PasswordMatch])

    async function registerUser(event) {
        event.preventDefault()

        const v1 = EMAIL_REGEX.test(Email);
        const v2 = PWD_REGEX.test(Password);
        if (!v1) {
            setErrMsg("Invalid Email");
            return;
        }
        if (!v2) {
            setErrMsg("Password must include a special character, big letters, numbers and be bigger than 8 character");
            return;
        }
        try {
            const user = {
                Password: Password,
                User_FirstName: FirstName,
                User_LastName: LastName,
                Email: Email,
                Carrinho: []
            }
            await Barcelparts.registerUser(JSON.stringify(user))
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setEmail('');
            setPassword('');
            setPasswordMatch('');
            window.location.href = "/Login_Page";
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <svg height="500px" width="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                            focusable="false">
                            <image height="100%" width="100%" xlinkHref=".\Assets\Images\voiture.svg" style={{ "mixBlendBode": "multiply" }} x="0" y="0" />
                        </svg>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={registerUser}>
                            <h3 className=" fw-normal mb-0 me-2">Register</h3>
                            <br></br>
                            <p ref={errRef} className={errMsg ? "errmsg" : "d-none"} aria-live="assertive">{errMsg}</p>
                            <div className="form-outline mb-2">
                                <input
                                    value={FirstName}
                                    required
                                    onChange={e => { setFirstName(e.target.value) }}
                                    type="text"
                                    id="FistName"
                                    name="FirstName"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your First Name" />
                                <label className="form-label" htmlFor="FirstName">First Name</label>
                            </div>

                            <div className="form-outline mb-2">
                                <input
                                    value={LastName}
                                    required
                                    onChange={e => { setLastName(e.target.value) }}
                                    type="text"
                                    id="LastName"
                                    name="LastName"
                                    className="form-control form-control-lg"
                                    placeholder="Enter your Last Name" />
                                <label className="form-label" htmlFor="LastName">Last Name</label>
                            </div>

                            <div className="form-outline mb-2">
                                <input
                                    ref={emailRef}
                                    value={Email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    onChange={e => { setEmail(e.target.value) }}
                                    type="email"
                                    id="email" name="email"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid Email" />
                                <label className="form-label" htmlFor="Email">Email</label>
                                <p id="uidnote" className={emailFocus && Email && !validEmail ? "instructions" : "d-none"}>
                                    Email must be like example@example.com
                                </p>
                            </div>

                            <div className="form-outline mb-2">
                                <input
                                    value={Password}
                                    required
                                    onChange={e => { setPassword(e.target.value) }}
                                    type="password"
                                    id="Password"
                                    name="Password"
                                    aria-invalid={validPwd ? "false" : "true"}
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    className="form-control form-control-lg"
                                    placeholder="Enter Password" />
                                <label className="form-label" htmlFor="Password">Password</label>
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "d-none"}>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                            </div>

                            <div className="form-outline mb-2">
                                <input
                                    value={PasswordMatch}
                                    required
                                    onChange={e => { setPasswordMatch(e.target.value) }}
                                    type="password"
                                    id="Password2"
                                    name="Password2"
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    className="form-control form-control-lg"
                                    placeholder="Enter the same Password" />
                                <label className="form-label" htmlFor="Password2">Password again</label>
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "d-none"}>
                            Must match the first password input field.
                        </p>
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn btn-primary btn-lg"
                                    style={{ "paddingLeft": "2.5rem", "paddingRight": "2.5rem" }}>Register</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Register_Page;