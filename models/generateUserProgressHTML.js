const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserCourse = require('./models/userCourse');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  generateHTML();
}).catch(err => console.error('MongoDB connection error:', err));

async function generateHTML() {
  try {
    const allProgress = await UserCourse.find();

    const grouped = {};
    for (const entry of allProgress) {
      if (!grouped[entry.username]) {
        grouped[entry.username] = [];
      }
      grouped[entry.username].push({ course: entry.course, progress: entry.progress });
    }

    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Course Progress</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f2fff2;
      padding: 40px;
    }
    h1 {
      text-align: center;
      color: #006600;
    }
    .user-block {
      background: #ffffff;
      padding: 20px;
      margin: 20px auto;
      border: 1px solid #ddd;
      border-radius: 12px;
      max-width: 600px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    }
    .user-block h2 {
      color: #004d00;
    }
    .course-progress {
      margin-left: 20px;
    }
  </style>
</head>
<body>
  <h1>User Course Progress</h1>
`;

    for (const username in grouped) {
      html += `<div class="user-block"><h2>${username}</h2><div class="course-progress">`;
      grouped[username].forEach(c => {
        html += `<p><strong>${c.course}</strong>: ${c.progress}% completed</p>`;
      });
      html += `</div></div>`;
    }

    html += `
</body>
</html>`;

    fs.writeFileSync('public/user-progress.html', html);
    console.log('✅ HTML file generated at public/user-progress.html');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating HTML:', error);
    process.exit(1);
  }
}
