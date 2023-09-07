import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import getProject from "./routes/getProject.js";
import getTicket from "./routes/getTicket.js";
import getUser from "./routes/getUser.js";
import getComment from "./routes/getComment.js";
import getUserProfile from "./routes/getUserProfile.js";
import postComment from "./routes/postComment.js";
import postProject from "./routes/postProject.js";
import postTicket from "./routes/postTicket.js";
import postUser from "./routes/postUser.js";
import postUserLogin from "./routes/postUserLogin.js"
import postUserLogout from "./routes/postUserLogout.js"
import Comment from "./models/Comment.js";
import Project from "./models/Project.js";
import Ticket from "./models/Ticket.js";
import User from "./models/User.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";


const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;


// CONFIGURATIONS
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin:'http://127.0.0.1:5173'}));
app.use(cookieParser());

// ROUTES
const projectsRoutes = [getProject, postProject]
const ticketsRoutes = [getTicket, postTicket]
const usersRoutes = [getUser, getUserProfile, postUser, postUserLogin, postUserLogout]
const commentsRoutes = [getComment, postComment]
app.use("/projects", projectsRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/users", usersRoutes);
app.use("/comments", commentsRoutes);


// app.post('/register', async (req, res) => {
//     const {username, password} = req.body;
//     try {
//         const userDoc = await User.create({
//             username,
//             password:bcrypt.hashSync(password, salt),
//         });
//         res.json(userDoc);
//     } catch(e) {
//         console.log(e);
//         res.status(400).json(e)
//     }

// });

// app.post('/login', async (req, res) => {
//     const {username, password} = req.body;
//     const userDoc = await User.findOne({username});
//     const passOk = bcrypt.compareSync(password, userDoc.password)
//     if (passOk){
//         jwt.sign({username, id: userDoc._id}, secret, {}, (err, token) => {
//             if (err) throw err;
//             res.cookie('token', token).json({
//                 id: userDoc._id,
//                 username,
//             });
//         });
//     } else {
//         res.status(400).json('wrong credentials');
//     }
// });

// app.get('/profile', (req, res) => {
//     const {token} = req.cookies;
//     jwt.verify(token, secret, {}, (err, info) => {
//         if (err) throw err;
//         res.json(info);
//     });
// });

// app.post('/logout', (req, res) => {
//     res.cookie('token', '').json('ok');
// })

// MONGOOSE SETUP

const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
        // ADD DATA ONE TIME ONLY OR AS NEEDED
        // do NOT ever use in a real production app, for obvious reasons future arjun
        // await mongoose.connection.db.dropDatabase(); // drop current database, no duplicate database then seed it
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((error) => console.log(`${error} did not connect`));