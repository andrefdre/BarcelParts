import http from "../http-common";

class ProductsDataService {
  getAll(page = 0) {
    return http.get(`products?page=${page}`);
  }

  get(id) {
    return http.get(`/products?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`products?${by}=${query}&page=${page}`);
  } 

  getMarcas(id) {
    return http.get(`/Marcas`);
  }

}

export default new ProductsDataService();