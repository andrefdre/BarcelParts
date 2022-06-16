import React, { useEffect, useState } from "react";
import Barcelparts from "../Services/Barcelparts";

function Register_Page() {
    const [UserName, setUserName] = useState('');
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Password2, setPassword2] = useState('');

    async function registerUser(event) {
        event.preventDefault()
        const user = {
            UserName: UserName,
            Password: Password,
            User_FirstName: FirstName,
            User_LastName: LastName,
            Email: Email,
            Carrinho: []
        }
       const response = await Barcelparts.registerUser(JSON.stringify(user))
       console.log(response)
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
                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-2">
                            <input
                                value={UserName}
                                onChange={e => { setUserName(e.target.value) }}
                                type="text"
                                id="UserName"
                                name="UserName"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid User Name" />
                            <label className="form-label" htmlFor="UserName">User Name</label>
                        </div>

                        <div className="form-outline mb-2">
                            <input
                                value={FirstName}
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
                                onChange={e => { setLastName(e.target.value) }}
                                type="text"
                                id="LastName"
                                name="LastName"
                                className="form-control form-control-lg"
                                placeholder="Enter your Last Name" />
                            <label className="form-label" htmlFor="LastName">Last Name</label>
                        </div>

                        {/* <!-- Password input --> */}
                        <div className="form-outline mb-2">
                            <input
                                value={Email}
                                onChange={e => { setEmail(e.target.value) }}
                                type="email"
                                id="email" name="email"
                                className="form-control form-control-lg"
                                placeholder="Enter a valid Email" />
                            <label className="form-label" htmlFor="Email">Email</label>
                        </div>

                        <div className="form-outline mb-2">
                            <input
                                value={Password}
                                onChange={e => { setPassword(e.target.value) }}
                                type="password"
                                id="Password"
                                name="Password"
                                className="form-control form-control-lg"
                                placeholder="Enter Password" />
                            <label className="form-label" htmlFor="Password">Password</label>
                        </div>

                        <div className="form-outline mb-2">
                            <input
                                value={Password2}
                                onChange={e => { setPassword2(e.target.value) }}
                                type="password"
                                id="Password2"
                                name="Password2"
                                className="form-control form-control-lg"
                                placeholder="Enter the same Password" />
                            <label className="form-label" htmlFor="Password2">Password again</label>
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