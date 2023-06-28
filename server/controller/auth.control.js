const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// register
const register = async (req, res) => {

   const { username, password } = req.body;

   try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt)

      const exist = await User.findOne({ username })
      if (exist) {
         res.status(300).json('username already exist')
      } else {
         const userObj = {
            username: username,
            password: hashPassword
         }
         const userData = await User.create(userObj)
         const { password, ...others } = userData._doc

         res.status(200).json(others)
      }
   } catch (error) {
      res.status(400).json(error)
   }
};


const signin = async (req, res) => {
   const cookies = req.cookies;
   // console.log(`cookies availbale at login ${cookies}`)
   const { username, password } = req.body;

   if (!username || !password) return res.status(400).json({ 'message': 'username and password required' });

   const foundUser = await User.findOne({ username });
   if (!foundUser) return res.sendStatus(401)  //unauthorized

   const match = await bcrypt.compare(password, foundUser.password);

   if (match) {
      const token = await jwt.sign(
         { foundUser },
         process.env.ACCESS_TOKEN,
         { expiresIn: '1d' }
      );
      // const newUser = await User.updateOne({ username }, { token: token })
      if (cookies?.jwt) res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
      res.cookie('jwt', token, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

      const { password, ...others } = foundUser._doc;
      res.json({ 'token': token, 'user': others })
   } else {
      res.status(400).json('cannot login')
   }
}

const logout = async (req, res) => {
   res.cookie('jwt', '').json('logout successfully')
}

module.exports = { register, signin, logout }