import React from "react";
import Barcelparts from "../Services/Barcelparts";

function MyData_Page(props) {


  function validate() {


    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;


    //Creates a temporary variable to edit the data from user
    var tempUser = props.user;
    //Adds the new product to the existing in the users cart
    //Creates the object to be sent to the database
    let data = {
      _id: tempUser._id,
      User_FirstName: firstName,
      User_LastName: lastName

    }
    //Sends the data to the backend

    console.log(data)
    Barcelparts.updateUser(JSON.stringify(data))
      .then(function (result) {
        //Prints the result
        console.log(result)
      })
    //Reloads the page to show the results
    // window.location.reload(true)
  }

  return (
    <React.Fragment>

      <p> update your info:</p>
      <div>
        <form>
          <label>First name:</label>
          <br></br>
          <input type="text" id="fname" name="fname"></input>
          <br></br>
          <label>Last name:</label>
          <br></br>
          <input type="text" id="lname" name="lname"></input>
          <br></br>
          <input type="button" onClick={validate} value="Submit"></input>
        </form>
      </div>

    </React.Fragment>
  )



}

export default MyData_Page;