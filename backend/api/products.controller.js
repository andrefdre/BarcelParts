import productsDAO from "../dao/productsDAO.js"

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
      const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
      const page = req.query.page ? parseInt(req.query.page, 10) : 0
  
      let filters = {}
      if (req.query.cuisine) {
        filters.cuisine = req.query.cuisine
      } else if (req.query.zipcode) {
        filters.zipcode = req.query.zipcode
      } else if (req.query.name) {
        filters.name = req.query.name
      }
  
      const { restaurantsList, totalNumRestaurants } = await productsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      })
  
      let response = {
        restaurants: restaurantsList,
        page: page,
        filters: filters,
        entries_per_page: restaurantsPerPage,
        total_results: totalNumRestaurants,
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
  
    static async apiGetRestaurantCuisines(req, res, next) {
      try {
        let cuisines = await productsDAO.getCuisines()
        res.json(cuisines)
      } catch (e) {
        console.log(`api, ${e}`)
        res.status(500).json({ error: e })
      }
    }
  }