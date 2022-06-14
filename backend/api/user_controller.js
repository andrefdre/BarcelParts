const User = require("../schema/user_schema.js");

class UserController {

    static async apiGetUserById(req, res, next) {
        try {
            //Calls the function to retrieve the products brands
            let user = await User.findById(req.body._id)
            //Stores the result in the res
            res.json(user)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    //Queries the database to find the user with the specified email
    static async apiGetUserByEmail(req, res, next) {
        try {
            //Calls the function to retrieve the products brands
            let user = await User.findOne({Email:req.body.Email})
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

    //Function that will Update the user information
    static async apiUpdateUser(req, res, next) {
        try {
            var user = await User.findById(req.body._id);

            if (req.body.Address) {
                user.Address = req.body.Address;
            } 
            if (req.body.Carrinho) {
                user.Carrinho = req.body.Carrinho
            }
            if (req.body.User_FirstName){
                user.User_FirstName = req.body.User_FirstName
            }
            if(req.body.User_LastName){
                user.User_LastName = req.body.User_LastName
            }

            // Updates the user information in the database
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