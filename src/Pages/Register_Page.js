import React from "react";


function Register_Page() {

  return (
    <React.Fragment>
      {/* <!-- Main Content of the Webpage --> */}
      {/* <!-- Items that will not be displayed with all width of the Page --> */}
      <div className="container-md">
        <form>
          <input type="text" placeholder="Name"></input>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="password"></input>
        </form>
      </div>
    </React.Fragment>
  )

}

export default Register_Page;