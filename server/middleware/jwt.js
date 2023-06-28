const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;
   if (!authHeader) return res.status(401).json({ message: "token not found" });
   const token = authHeader.split(' ')[1];

   if (!token) return res.sendStatus(401) // unauthorized

   jwt.verify(
      token,
      process.env.ACCESS_TOKEN,
      (err, decode) => {
         if (err) return res.sendStatus(403);
         // req.user = decode.foundUser
         return next()
      }
   )
}


module.exports = verifyJWT;