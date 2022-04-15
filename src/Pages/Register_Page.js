import React from "react";


function Product_Page() {

  return (
    <React.Fragment>
      {/* <!-- Main Content of the Webpage --> */}
      {/* <!-- Items that will not be displayed with all width of the Page --> */}
      <div class="container-md">
        <form>
          <input type="text" placeholder="Name"></input>
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="password"></input>
        </form>
      </div>
    </React.Fragment>
  )

}

export default Product_Page;