const User = require('../../models/user_schema.js');

//import authRoute from '../routes/authRoute.js';

//import JWT from "jsonwebtoken";
const { comparePassword, hashPassword } = require("./../helpers/authHelper.js");
const JWT = require("jsonwebtoken");
//register controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.send({ error: 'Name is required' });
        }
        if (!email) {
            return res.send({ error: 'Email is required' });
        }
        if (!password) {
            return res.send({ error: 'Password is required' });
        }
        if (!phone) {
            return res.send({ error: 'Phone No is required' });
        }
        if (!address) {
            return res.send({ error: 'Address is required' });
        }
        //check user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already registered please login',
            })
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user,
        })
    }
    catch (error) {
        console.log(`${error}`);
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
    }
}

//login 
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",

            })
        }
        // check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
                // error
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Password is incorrect",

            })
        }
        //token
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error in login',
            error
        })
    }
}