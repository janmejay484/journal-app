const mongoose =require('mongoose');
const plm = require("passport-local-mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/journalapp");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  journals:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'journal'
  }],
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 6,
  // },
});
userSchema.plugin(plm);
module.exports = mongoose.model('User', userSchema);
