const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ======= ROUTES =======

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.send('User already exists');

    const newUser = new User({ username, password });
    await newUser.save();
    console.log(`✅ New user "${username}" registered`);
    res.redirect(`/dashboard.html?from=signup&username=${username}`);
  } catch (err) {
    console.error('🚨 Signup error:', err);
    res.status(500).send('Server error');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      console.log(`✅ User "${username}" logged in`);
      res.redirect(`/dashboard.html?from=login&username=${username}`);
    } else {
      console.log('❌ Invalid login attempt');
      res.send('Invalid credentials');
    }
  } catch (err) {
    console.error('🚨 Login error:', err);
    res.status(500).send('Server error');
  }
});

// Register Course
app.post('/register-course', async (req, res) => {
  const { username, courseName } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const existingCourse = user.registeredCourses.find(c => c.courseName === courseName);
    if (!existingCourse) {
      user.registeredCourses.push({ courseName, completedVideos: [] });
      await user.save();
      console.log(` Course "${courseName}" registered for ${username}`);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('🚨 Error registering course:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Complete Video
app.post('/complete-video', async (req, res) => {
  const { username, courseName, videoIndex } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const course = user.registeredCourses.find(c => c.courseName === courseName);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    if (!course.completedVideos.includes(videoIndex)) {
      course.completedVideos.push(videoIndex);
      await user.save();
      console.log(`✅ ${username} completed video ${videoIndex} in ${courseName}`);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('🚨 Error completing video:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch Progress
app.get('/progress/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      username: user.username,
      registeredCourses: user.registeredCourses.map(course => ({
        courseName: course.courseName,
        completedVideos: course.completedVideos
      }))
    });
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
