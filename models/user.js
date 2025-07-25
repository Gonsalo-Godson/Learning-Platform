// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  registeredCourses: [
    {
      courseName: String,
      completedVideos: [Number] // indices of watched videos
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
