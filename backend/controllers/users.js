import Project from "../models/Project.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

export const getUser = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserIdOne = async (req, res) => {
    const name = req.header("Name")
    try{
        const project = await Project.findOne({fullName: name})
        res.status(200).json(project._id)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserProfile = async (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
}

export const getUsersNames = async (req, res) => {
    try{
        const { userIds } = req.body;
        const usersNameList = await Promise.all(userIds.map(async (id) => {
            const user = await User.findOne({_id: id})
            return `${user.firstName} ${user.lastName}`
        }
        ))
        console.log(usersNameList)
        res.json(usersNameList);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const postUser = async (req, res) => {
    const {username, password, firstName, lastName} = req.body;
    try {
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt),
            firstName,
            lastName,
        });
        res.json(userDoc);
    } catch(e) {
        console.log(e);
        res.status(400).json(e)
    }
}

export const postUserLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, user.password)
    if (passOk){
        const token = jwt.sign({ id: user._id }, `${process.env.SECRET}`);
        delete user.password;
        res.status(200).json({ token, user });
    } else {
        res.status(400).json('wrong credentials');
    }
}

export const postUserLogout = async (req, res) => {
    res.cookie('token', '').json('ok');
}

export const patchUserRole = async (req, res) => {
    const {role, userId} = req.body
    try {
        await User.findByIdAndUpdate(userId, { role: role} )
        res.status(200).json()
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}