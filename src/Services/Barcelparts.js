//Declares the imports necessary
import http from "../http-common";

// Creates a function that will be exported with a list of functions inside
class ProductsDataService {
  //Function to send a get request to all the products
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  //Function to create a new Product on the database
  createProduct(data) {
    return http.post('/Create_Product', data)
  }

  //Function to delete a new Product on the database
  deleteProduct(data) {
    return http.post('/Delete_Product', data)
  }

  //Function to send a get request to product by id
  get(id) {
    return http.get(`Product?id=${id}`)
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
  
  //Function to update the user information
  updateUser(data) {
    return http.post('/UpdateUser', data)
  }

  //Function to create a new order on the database
  createOrder(data) {
    return http.post('/CreateOrder', data)
  }

  //Function to get the orders from the database
  getOrders(data) {
    return http.post('/GetOrder',data)
  }

  //Users
 //Function to create a new user on the database
 registerUser(data) {
  return http.post('/register', data)
}

loginUser(refreshToken) {
  return http.post('/login', refreshToken)
}

logoutUser(data) {
  return http.post('/logout', data)
}

getUser(token) {
  return http.get('/getUser',{headers: { "authorization": `Bearer ${token}` }})
}

getNewToken(refreshToken) {
  return http.post('/token', refreshToken)
}

}

//Exportes the function to be used in other places
export default new ProductsDataService();