import productsDAO from "../dao/productsDAO.js"

export default class ProductsController {
    static async apiGetProducts(req, res, next) {
      const ProductsPerPage = req.query.ProductsPerPage ? parseInt(req.query.ProductsPerPage, 10) : 20
      const page = req.query.page ? parseInt(req.query.page, 10) : 0
  
      let filters = {}
      if (req.query.cuisine) {
        filters.cuisine = req.query.cuisine
      } else if (req.query.zipcode) {
        filters.zipcode = req.query.zipcode
      } else if (req.query.name) {
        filters.name = req.query.name
      }
    //   My filters 
      else if (req.query.Design) {
        filters.Design = req.query.Design
      }else if (req.query.Marca) {
        filters.Marca = req.query.Marca
      }
  
      const { ProductsList, totalNumProducts } = await productsDAO.getProducts({
        filters,
        page,
        ProductsPerPage,
      })
  
      let response = {
        products: ProductsList,
        page: page,
        filters: filters,
        entries_per_page: ProductsPerPage,
        total_results: totalNumProducts,
      }
      res.json(response)
    }


    static async apiGetRestaurantById(req, res, next) {
      try {
        let id = req.params.id || {}
        let restaurant = await productsDAO.getRestaurantByID(id)
        if (!restaurant) {
          res.status(404).json({ error: "Not found" })
          return
        }
        res.json(restaurant)
      } catch (e) {
        console.log(`api, ${e}`)
        res.status(500).json({ error: e })
      }
    }
  
    static async apiGetProductsMarcas(req, res, next) {
      try {
        let Marcas = await productsDAO.getMarcas()
        res.json(Marcas)
      } catch (e) {
        console.log(`api, ${e}`)
        res.status(500).json({ error: e })
      }
    }
  }