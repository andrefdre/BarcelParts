const User = require("../schema/user_schema.js");

class UserController {

    static async apiGetUserById(req, res, next) {
        try {
            //Calls the function to retrieve the products brands
            let user = await User.findById(req.query.Id)
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
            console.log(user);
            User.create(user, function(err, doc){
                if(err) return err;
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

}

module.exports = UserController