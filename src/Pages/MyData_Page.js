import React from "react";
import Barcelparts from "../Services/Barcelparts";
import {getJwtToken} from '../Services/authentication'

function MyData_Page(props) {

      //Creates a variable with the user info
      var tempUser = props.user;

  function sendNames() {

    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;

    //Creates the object to be sent to the database
    let data = {
      User_FirstName: firstName,
      User_LastName: lastName

    }
    //Sends the data to the backend

    //console.log(data)
    Barcelparts.updateUser(JSON.stringify(data),getJwtToken())
      .then(function (result) {
        //Prints the result
        console.log(result)
      })

    alert("your name info was succesfully updated!")
    window.location.reload(true)
  }

  function sendAddress() {

    var address = document.getElementById("address").value;

    //Creates the object to be sent to the database
    let data = {
      _id: tempUser._id,
      Address: address,
    }
    //Sends the data to the backend

    console.log(data)
 
    Barcelparts.updateUser(JSON.stringify(data),getJwtToken())
      .then(function (result) {
        //Prints the result
        console.log(result)
      })

    alert("your address was successfully updated!")
    window.location.reload(true)

  }

  return (
    <React.Fragment>
      {/* left side of the screen*/}
      <div className="text-center split left">
      <h4>Current info:</h4>
      <br></br>
        <img className="Logo" src={props.user.User_Image} alt=""></img>
        <br></br>
        <br></br>
        <p>
        First Name:{tempUser.User_FirstName}<br></br>
        Last Name:{tempUser.User_LastName}<br></br>
        Address: {tempUser.Address}<br></br>
        Email: {tempUser.Email}<br></br>
        </p>
      </div>

      {/* right side of the screen*/}
      <div className="text-center split right">
        <br></br>
        <div>


          <h3>update your info:</h3>
          <br></br>
        </div>
        < div className="LoginPageButtons">
          <form>
            <br></br>
            <h4>First name:</h4>
            <input type="text" id="fname" name="fname"></input>
            <br></br><br></br>
            <h4>Last name:</h4>
            <input type="text" id="lname" name="lname"></input>
            <br></br>
            <input type="button" onClick={sendNames} value="Submit"></input>
            <br></br><br></br>
          </form>
        </div>
        <br></br><br></br>

        <div className="LoginPageButtons">
          <form>
            <br></br>
            <h4>Address:</h4>
            <input type="text" id="address" name="address"></input>
            <br></br>
            <input type="button" onClick={sendAddress} value="Submit"></input>
            <br></br><br></br>
          </form>
        </div>


      </div>

    </React.Fragment>
  )



}

export default MyData_Page;