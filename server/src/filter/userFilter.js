import jwtUtil from "../util/jwtUtil.js";


function authorize(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (authHeader == undefined) {
    res.status(400); 
    res.send("Authorization header is missing");
  } else {

    const authToken = authHeader.replace("Bearer ", "");

    try { 
     const decoded = jwtUtil.verify(authToken); 

     if (decoded.role === "user") {
      next(); }
    } catch (err) { 
      console.log(req.ip, err.serverMessage);

      res.status(403); 
      res.send(err.clientMessage);
    }}
  
}

export default { authorize };