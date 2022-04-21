import http from "../http-common";

class ProductsDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  get(id) {
    return http.get(`?id=${id}`);
  }

  find(query, by = "Design", page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  } 

  getMarcas() {
    return http.get(`/Marcas`);
  }

  getCategories() {
    return http.get(`/Categories`);
  }

}

export default new ProductsDataService();