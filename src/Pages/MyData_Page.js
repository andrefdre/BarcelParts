import React from "react";
import Barcelparts from "../Services/Barcelparts";

function MyData_Page(props) {


  function sendNames() {

    var firstName = document.getElementById("fname").value;
    var lastName = document.getElementById("lname").value;

    //Creates a temporary variable to edit the data from user
    var tempUser = props.user;
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

    alert("your name info was succesfully updated!")
  }

  function sendAddress() {

    var address = document.getElementById("address").value;

    //Creates a temporary variable to edit the data from user
    var tempUser = props.user;
    //Creates the object to be sent to the database
    let data = {
      _id: tempUser._id,
      Address: address,
    }
    //Sends the data to the backend

    console.log(data)
    Barcelparts.updateUser(JSON.stringify(data))
      .then(function (result) {
        //Prints the result
        console.log(result)
      })

      alert("your address was succesfully updated!")

  }

  return (
    <React.Fragment>

      <div className="col-md-12 text-center ">
        <div>
        <img class="Logo" src={props.user.User_Image} alt=""></img>
          <br></br>
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