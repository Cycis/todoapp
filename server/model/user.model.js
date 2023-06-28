const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true
   },
   password: {
      type: String,
      required: true,
      minlength: [6, 'Minimum password length is 6'],
   },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);