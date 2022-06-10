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
}

module.exports = OrdersController