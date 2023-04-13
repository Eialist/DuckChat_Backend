import express from 'express';
import jwtUtil from "../util/jwtUtil.js";
import { fetchUser } from '../service/userService.js';

const authRouter = express.Router();


authRouter.post("/auth/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username == undefined || password == undefined) {
    res.status(400); 
    res.send("Missing authentication details");
  } else {
    const user = await fetchUser(username, password);
    console.log(username);

    if(!user) {
        return res.send({
            status: "error",
            error: "Invalid username/password",
        }); 
    } 
        const role  = user.role; 
        const token = jwtUtil.generate(username, role);
        res.status(200);
        res.send(token);
    } 
  }
);

export default authRouter;