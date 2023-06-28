const User = require('../model/user.model');

const getUser = async (req, res) => {
   const user = req.user;

   const userProf = await User.findById(user._id)
   res.status(200).json(userProf)
}

module.exports = { getUser }