const Product = require("../schema/product_schema.js");


class ProductsController {
    static async apiGetProducts(req, res, next) {
        //Gets the ProductsPerPage from the url if not inserted default value is 28
        const ProductsPerPage = req.query.ProductsPerPage ? parseInt(req.query.ProductsPerPage, 10) : 28
        //Gets the Page from the url if not inserted default value is 0
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        let query = {}
        let sort_buffer = {}
        let sort = {};

        //If filters are passed then create a structure with the filters
        if (req.query.Design) {
            filters.Design = req.query.Design
        } else if (req.query.Marca) {
            filters.Marca = req.query.Marca
        } else if (req.query.NomeFamilia) {
            filters.NomeFamilia = req.query.NomeFamilia
        }

        //Sets the query based on filters
        if (filters) {
            if ("Design" in filters) {
                query = { $text: { $search: filters["Design"] } }
            } else if ("Marca" in filters) {
                query = { "Marca": { $eq: filters["Marca"] } }
            } else if ("NomeFamilia" in filters) {
                query = { "NomeFamilia": { $eq: filters["NomeFamilia"] } }
            }
        }

        //If Sort filter is passed then create a buffer with the filters
        if (req.query.sort) {
            sort_buffer = req.query.sort
        }

        //Sets the sort query based on sort filter
        if (sort_buffer) {
            if ("PriceAscending" == sort_buffer) {
                sort = { 'PrecoCusto': 1 }
            }
            else if ("PriceDescending" == sort_buffer) {
                sort = { 'PrecoCusto': -1 }
            }
            else if ("A-Z" == sort_buffer) {
                sort = { 'Design': 1 }
            }
            else if ("Z-A" == sort_buffer) {
                sort = { 'Design': -1 }
            }
        }

        try {
            //Calls the function to retrieve the products sorted with the established limit and paginates it with skip
            let ProductsList = await Product.find(query).sort(sort).limit(ProductsPerPage).skip(ProductsPerPage * page);
            //Gets the total number of documents in the database for pagination
            const totalNumProducts = await Product.countDocuments(query)

            //Creates the response variable
            let response = {
                products: ProductsList,
                page: page,
                filters: filters,
                sort: sort,
                entries_per_page: ProductsPerPage,
                total_results: totalNumProducts,
            }

            //Stores the result in the res
            res.json(response)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetProductById(req, res, next) {
        try {
            //Calls the function to retrieve the products brands
            let response = await Product.findById(req.query.id)

            //Stores the result in the res
            res.json(response)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetProductsMarcas(req, res, next) {
        try {
            //Calls the function to retrieve the products brands
            let Marcas = await Products.distinct("Marca")
            //Stores the result in the res
            res.json(Marcas)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetProductsCategories(req, res, next) {
        try {
            //Calls the function to retrieve the products categories
            let Category = {
                Categories: [],
                SubCategory: []
            }
            Category.Categories = await Product.distinct("NomeFamilia");

            // for (let i = 0; i < Category.Categories.length; i++) {
            //     let SubCategory = await Product.find({ NomeFamilia: Category.Categories[i] }).distinct("SubFamilia");
            //     Category.SubCategory[i] = SubCategory
            // }
            //Stores the result in the res
            res.json(Category)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

}

module.exports = ProductsController