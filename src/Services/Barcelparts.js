//Declares the imports necessary
import http from "../http-common";
import $ from "jquery";

// Creates a function that will be exported with a list of functions inside
class ProductsDataService {
  //Function to send a get request to all the products
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  //function to create a new Product on the database
  createProduct(data) {
    return http.post('/Create_Product', data)
  }

    //function to delete a new Product on the database
    deleteProduct(data) {
      return http.post('/Delete_Product', data)
    }

  //Function to send a get request to product by id
  get(id) {
    return http.get(`Product?id=${id}`)
  }

  getProduct(id) {
    let results
    $.getJSON(`http://localhost:5000/api/routes/Product?id=${id}`, function (response, status, xhr) {
      results = response
    })
    return results
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
  createUser(data) {
    return http.post('/CreateUser', data)
  }

  //function to get the user in case it exists in the database
  findUser(data) {
    return http.post('/User', data)
  }

  updateUser(data) {
    return http.post('/UpdateUser', data)
  }

}

//Exportes the function to be used in other places
export default new ProductsDataService();