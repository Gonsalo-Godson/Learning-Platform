// models/userCourse.js
const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema({
  username: String,
  course: String,
  progress: Number // percentage
});

module.exports = mongoose.model('UserCourse', userCourseSchema);
