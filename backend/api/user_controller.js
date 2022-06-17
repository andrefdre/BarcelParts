require('dotenv').config()
const User = require("../schema/user_schema.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let refreshTokens = [];

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
            let user = await User.findOne({ Email: req.body.Email })
            //Stores the result in the res
            res.json(user)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static async apiCreateUser_old(req, res, next) {
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
            if (req.body.User_FirstName) {
                user.User_FirstName = req.body.User_FirstName
            }
            if (req.body.User_LastName) {
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



    //New code
    static async apiUserLogin(req, res, next) {
        const user = await User.findOne({ UserName: req.body.Email })
        if (user == null || user.Email != req.body.Email) {
            return res.status(400).send('User not found')
        }
        try {
            if (await bcrypt.compare(req.body.Password, user.Password)) {
                const accessToken = apiGenerateAccessToken({ _id: user._id })
                const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken)
                res.json({ accessToken: accessToken, refreshToken: refreshToken })
            }
            else {
                res.status(403).send('Not allowed')
            }
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static apiUserLogout(req, res, next) {
        refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        res.sendStatus(204)
    }

    static async apiCreateUser(req, res, next) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.Password, 10)
            const user = {
                Password: hashedPassword,
                User_FirstName: req.body.User_FirstName,
                User_LastName: req.body.User_LastName,
                Email: req.body.Email,
                Carrinho: req.body.Carrinho
            }
            const userExists = await User.findOne({ Email: user.Email })
            if (userExists != null) return res.status(409).send()

            User.create(user, function (err, doc) {
                if (err) return err;
                else {
                    res.status(201).send()
                }
            });
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }

    static apiAuthenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.User = user
            next()
        })
    }


    static apiToken(req, res, next) {
        const refreshToken = req.body.token
        if (refreshToken == null) return res.sendStatus(401)
        if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            console.log(user)
            const accessToken = apiGenerateAccessToken({ _id: user._id })
            res.json({ accessToken: accessToken })
        })

    }


    static async apiGetUser(req, res, next) {
        try {
            const userTemp = await User.findById(req.User._id)
            const user = {
                User_FirstName: userTemp.User_FirstName,
                User_LastName: userTemp.User_LastName,
                Email: userTemp.Email,
                Carrinho: userTemp.Carrinho,
                Owner: userTemp.Owner,
                Address: userTemp.Address
            }
            res.send(user)
        }
        //Catches erros and displays them 
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}

function apiGenerateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}

module.exports = UserController