import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let products

export default class ProductsDAO {
  static async injectDB(conn) {
    if (products) {
      return
    }
    try {
      products = await conn.db(process.env.BARCELPARTS_NS).collection("Products")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in BARCELPARTS DAO: ${e}`,
      )
    }
  }

  static async getProducts({
    filters = null,
    page = 0,
    ProductsPerPage = 20,
  } = {}) {
    let query

    if (filters) {
       if ("Design" in filters) {
        query = { $text: { $search: filters["Design"] } }
      } else if ("Marca" in filters) {
        query = { "Marca": { $eq: filters["Marca"] } }
      }
    }

    let cursor
    
    try {
      cursor = await products
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { ProductsList: [], totalNumProducts: 0 }
    }

    const displayCursor = cursor.limit(ProductsPerPage).skip(ProductsPerPage * page)

    try {
      const ProductsList = await displayCursor.toArray()
      const totalNumProducts = await products.countDocuments(query)

      return { ProductsList, totalNumProducts }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { ProductsList: [], totalNumProducts: 0 }
    }
  }

  
  static async getRestaurantByID(id) {
    try {
      const pipeline = [
        {
            $match: {
                _id: new ObjectId(id),
            },
        },
              {
                  $lookup: {
                      from: "reviews",
                      let: {
                          id: "$_id",
                      },
                      pipeline: [
                          {
                              $match: {
                                  $expr: {
                                      $eq: ["$restaurant_id", "$$id"],
                                  },
                              },
                          },
                          {
                              $sort: {
                                  date: -1,
                              },
                          },
                      ],
                      as: "reviews",
                  },
              },
              {
                  $addFields: {
                      reviews: "$reviews",
                  },
              },
          ]
      return await restaurants.aggregate(pipeline).next()
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  static async getMarcas() {
    let Marcas = []
    try {
      Marcas = await products.distinct("Marca")
      return Marcas
    } catch (e) {
      console.error(`Unable to get Marcas, ${e}`)
      return Marcas
    }
  }

  static async getCategories() {
    let Categories = []
    try {
      Categories = await products.distinct("NomeFamilia")
      return Categories
    } catch (e) {
      console.error(`Unable to get Categories, ${e}`)
      return Categories
    }
  }
}