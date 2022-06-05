const User = require("../schema/user_schema.js");

class UserController {

    static async apiGetUserById(req, res, next) {
        try {
            console.log(req.body)
            //Calls the function to retrieve the products brands
            let user = await User.find({Email:req.body.Email})
            //Stores the result in the res
            res.json(user)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiCreateUser(req, res, next) {
        try {
            var user = req.body;
            //Calls the function to retrieve the products brands
            console.log(user.Email);
            User.create(user, function (err, doc) {
                if (err) return err;
                else { res.send("User Created"); }
            });
            //Stores the result in the res
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiUpdateUser(req, res, next) {
        try {
            var user = await User.findById(req.body._id);

            if (req.body.Address) {
                user.Address = req.body.Address;
            } 
            if (req.body.Carrinho) {
                user.Carrinho = req.body.Carrinho
            }

            await user.save();
            //Stores the result in the res
            res.send(user)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

}

module.exports = UserController