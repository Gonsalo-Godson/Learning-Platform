const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer
});

module.exports = mongoose.model('Video', videoSchema);
