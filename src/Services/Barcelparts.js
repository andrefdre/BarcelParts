import http from "../http-common";

class ProductsDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`?id=${id}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  } 

  getMarcas() {
    return http.get(`/Marcas`);
  }

}

export default new ProductsDataService();