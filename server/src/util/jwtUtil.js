import jwt from "jsonwebtoken";
import * as env from 'dotenv';
env.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

function generate(username, role) {
    // registered claims (pre defined payload variables)
    let payloadOptions = {
      issuer: "Ducks-Chat-App",
      subject: "send and receive access token",
      expiresIn: "15m" // 15 minutes
    }
  
    // private claims (custom payload)
    let payload = {
      username: username,
      role: role,
    }
  
    let token = jwt.sign(payload, SECRET_KEY, payloadOptions);
  
    return token;
  }
  
  function verify(token) {
    try {
      return jwt.verify(token, SECRET_KEY); // verify signature and return payload
    } catch (err) {
      let verfError = new Error(); //custom verification error
  
      if (err.name == "JsonWebTokenError") {
        verfError.clientMessage = "Digital signing is invalid, request new token";
        verfError.serverMessage = "Token verification failed";
      }
  
      if (err.name == "TokenExpiredError") {
        verfError.clientMessage = "Digital signing is invalid, request new token";
        verfError.serverMessage = "Token expired";
      }
  
      throw verfError;
    }
  }
  
  export default { generate, verify }