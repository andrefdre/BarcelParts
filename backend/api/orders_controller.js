const Order = require("../schema/order_schema.js");


class OrdersController {
    static async apiCreateOrder(req, res, next) {
        try {
            var order = req.body;
            //Calls the function to retrieve the products brands
            console.log(order);
            Order.create(order, function (err, doc) {
                if (err) {
                    res.send(err)
                    return err;
                } 
                else { res.send("Order Created"); }
            });
            //Stores the result in the res
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiGetOrders(req, res, next) {
        //Gets the ProductsPerPage from the url if not inserted default value is 28
        const ProductsPerPage = req.query.OrdersPerPage ? parseInt(req.query.OrdersPerPage, 10) : 28
        //Gets the Page from the url if not inserted default value is 0
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        try {
            //Calls the function to retrieve the products sorted with the established limit and paginates it with skip
            let OrderList = await Order.find().limit(ProductsPerPage).skip(ProductsPerPage * page);
            //Gets the total number of documents in the database for pagination
            const totalNumOrders = await Order.countDocuments()

            //Creates the response variable
            let response = {
                Orders: OrderList,
                page: page,
                entries_per_page: ProductsPerPage,
                total_results: totalNumOrders,
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
}

module.exports = OrdersController