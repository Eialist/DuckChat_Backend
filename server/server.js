import express, { urlencoded } from 'express';
import router from "./src/router/router.js"
import cors from 'cors';
import authRouter from './src/router/authRouter.js';
import socketService from './socketService.js';
import { createServer } from 'http';
import * as env from 'dotenv';

env.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/health", (req, res) => {
    res.send("Server is up and running, Yey!");
});

app.use(authRouter);
app.use("/ducks/api", router);

const httpServer = createServer(app);
socketService.attach(httpServer);

httpServer.listen(6060, () => console.log("Server started..."))


