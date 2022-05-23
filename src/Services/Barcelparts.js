//Declares the imports necessary
import http from "../http-common";

// Creates a function that will be exported with a list of functions inside
class ProductsDataService {
  //Function to send a get request to all the products
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  //Function to send a get request to product by id
  get(id) {
    return http.get(`?id=${id}`);
  }

  //Function to send a get request to find a product with a certain characteristic
  find(query, by = "Design", page = 0, sort) {
    return http.get(`?${by}=${query}&page=${page}&sort=${sort}`);
  }

  //Function to send a get request to get all Marcas
  getMarcas() {
    return http.get(`/Marcas`);
  }

  //Function to send a get request to get all categories
  getCategories() {
    return http.get(`/Categories`);
  }

  //function to create a new user on the database
  createUser() {

    console.log("ab")


    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/api/routes/UpdateUser");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
      }
    };

    let data = `{
      "_id": "121212121212",
        "user_FirstName": "andre",
        "user_LastName": "segundo",
        "User_image": "htp/etc/etc",
        "Email": "blabla@bla.com"
      }`;

    xhr.send(data);
  }

}

//Exportes the function to be used in other places
export default new ProductsDataService();