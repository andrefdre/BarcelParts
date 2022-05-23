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
    return http.get(`Product?id=${id}`);
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
    return http.post('/CreateUser',data)    
  }

    //function to get the user in case it exists in the database
    findUser(data) {
      return http.post('/User',data)    
    }

}

//Exportes the function to be used in other places
export default new ProductsDataService();