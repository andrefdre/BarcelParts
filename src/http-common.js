//Declares the imports necessary
import axios from "axios";

//Exports a variables list to be used in the website
export default axios.create({
  baseURL: "http://localhost:5000/api/routes/",
  headers: {
    "Content-type": "application/json"
  }
});