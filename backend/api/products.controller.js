//Declares the imports necessary
import productsDAO from "../dao/productsDAO.js"

// Function with all the functions necessary for searching the database
export default class ProductsController {
  //Function to get the products
  static async apiGetProducts(req, res, next) {
    //Declares variables to show only a few items and what page it's in
    const ProductsPerPage = req.query.ProductsPerPage ? parseInt(req.query.ProductsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    //Declares the filters 
    let filters = {}
    if (req.query.Design) {
      filters.Design = req.query.Design
    } else if (req.query.Marca) {
      filters.Marca = req.query.Marca
    }

    //Calls the function to retrieve the products based on the requirements
    const { ProductsList, totalNumProducts } = await productsDAO.getProducts({
      //Requirements of the search field
      filters,
      page,
      ProductsPerPage,
    })

    //Response obtained 
    let response = {
      products: ProductsList,
      page: page,
      filters: filters,
      entries_per_page: ProductsPerPage,
      total_results: totalNumProducts,
    }
    //Stores the response in the res
    res.json(response)
  }

//Gets product by id this still wasn't tested and still needs to be correctly implemented
  static async apiGetProductById(req, res, next) {
    try {
      let id = req.params.id || {}
      let product = await productsDAO.getProductByID(id)
      if (!product) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(product)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  //Function to get The brands of products
  static async apiGetProductsMarcas(req, res, next) {
    try {
      //Calls the function to retrieve the products brands
      let Marcas = await productsDAO.getMarcas()
      //Stores the result in the res
      res.json(Marcas)
    }
    //Catches erros and displays them 
    catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  //Function to get The categories of products
  static async apiGetProductsCategories(req, res, next) {
    try {
      //Calls the function to retrieve the products categories
      let Categories = await productsDAO.getCategories()
      //Stores the result in the res
      res.json(Categories)
    }
    //Catches erros and displays them 
    catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}