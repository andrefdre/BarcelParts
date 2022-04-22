//Declares the imports necessary
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
//Variable for products information about connection with DB
let products

export default class ProductsDAO {
  //Establishes connection with MongoDB collection Products
  static async injectDB(conn) {
    if (products) {
      return
    }
    try {
      products = await conn.db(process.env.BARCELPARTS_NS).collection("Products")
    }
    //Catches erros and displays in console
    catch (e) {
      console.error(
        `Unable to establish a collection handle in BARCELPARTS DAO: ${e}`,
      )
    }
  }

  //Function to get the products from the database
  static async getProducts({
    filters = null,
    page = 0,
    ProductsPerPage = 20,
  } = {}) {
    let query

    //Sets the query based on filters
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
    }
    //Catches erros and displays in console
    catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { ProductsList: [], totalNumProducts: 0 }
    }

    const displayCursor = cursor.limit(ProductsPerPage).skip(ProductsPerPage * page)

    try {
      const ProductsList = await displayCursor.toArray()
      const totalNumProducts = await products.countDocuments(query)

      //Returns the result
      return { ProductsList, totalNumProducts }
    }
    //Catches erros and displays in console
    catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { ProductsList: [], totalNumProducts: 0 }
    }
  }

  //Gets Product by id still not fully implemented
  static async getProductByID(id) {
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
    }
    //Catches erros and displays in console
    catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`)
      throw e
    }
  }

  //Function to get the products brands without repeating the same from the database
  static async getMarcas() {
    let Marcas = []
    try {
      //Gets the brands
      Marcas = await products.distinct("Marca")
      return Marcas
    }
    //Catches erros and displays in console
    catch (e) {
      console.error(`Unable to get Marcas, ${e}`)
      return Marcas
    }
  }

  //Function to get the products categories without repeating the same from the database
  static async getCategories() {
    let Categories = []
    try {
      //Gets the categories
      Categories = await products.distinct("NomeFamilia")
      return Categories
    }
    //Catches erros and displays in console
    catch (e) {
      console.error(`Unable to get Categories, ${e}`)
      return Categories
    }
  }
}