const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


module.exports = (req, res, next) => {
   
  try {
      const token = req.headers.authorization.split(' ')[1];
      console.log("token is", token)
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
      console.log("decodedToken :", decodedToken)
      const userId = decodedToken.userId;
      console.log("userId:", userId)
      req.params.userId = userId;
      console.log(userId)
      console.log("User Id  is Valid!");
      next();
    } catch {
    res.status(401).json({ error: new Error("the request is not valid") });
  }
};