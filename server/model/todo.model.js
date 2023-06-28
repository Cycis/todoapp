const mongoose = require('mongoose');
const { Schema } = require('mongoose')

const TodoSchema = mongoose.Schema({
   text: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true
   },
   date: {
      type: Date,
      required: true,
   },
   status: {
      type: String,
      default: 'pending'
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   }
}, { timestamps: true });

module.exports = mongoose.model("Todo", TodoSchema);