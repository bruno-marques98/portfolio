import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';

const secret ="text";

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({email: user.email, id: user._id}, secret, {expiresIn: "1h"});
        res.status(200).json({result: user, token});
    } catch (err) {
        res.status(500).json({
            message: "Server Error!"
        });
    }
};

export const signup = async (req, res) => {
    const {email, password, firstName, lastName} = req.body;

    try{
        const oldUser = await UserModel.findOne({email});

        if(oldUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        });

        const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});
        res.status(201).json({result, token});
    } catch(err){
        res.status(500).json({
            message: "Server Error!"
        });
    }
}
