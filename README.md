# Learning-Platform
A learning platform using HTML,CSS and JavaScript . Which saves you video progress in a mangoDB database
Project output:

![WhatsApp Image 2025-04-06 at 15 57 34_b9cd3051](https://github.com/user-attachments/assets/6ed286b7-68d8-4717-aa4c-2f26e64f995e)
![WhatsApp Image 2025-04-06 at 15 58 19_342e7533](https://github.com/user-attachments/assets/fd2cd289-31de-4881-8645-2820299d5750)
![WhatsApp Image 2025-04-06 at 15 58 35_e5574501](https://github.com/user-attachments/assets/a5802f44-0b41-4e61-a19e-ca2346b6d287)

# 🎓 Full Stack Learning Platform

A simple full stack web application where users can sign up, log in, and register for courses. Each course includes 5 videos that are available only after registration.

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (MongoDB Atlas or local MongoDB)

---

## 🚀 Features

- User Registration and Login
- Course Page with 5 Videos per Course
- Video Playback only after Course Registration
- Each user’s registered courses stored securely in MongoDB

---

## 📁 Project Structure
Learning-Platform/
│
├── public/ # Frontend HTML, CSS, JS
│ ├── index.html # Main page with login/signup
│ ├── course.html # Course selection and video playback
│ └── styles.css
│
├── videos/ # Manually add course videos here
│ ├── course1_video1.mp4
│ ├── course1_video2.mp4
│ └── ... (total 5 videos per course)
│
├── models/
│ └── user.js # Mongoose User model
│
├── .env # Environment variables (MongoDB URI, etc.)
├── server.js # Node.js + Express backend
├── package.json

npm install

Create .env File: MONGO_URI=your_mongodb_connection_string
PORT=3000

Create a folder named videos/ in the root directory and add 5 videos for each course. Name them clearly, for example:

videos/
├── course1_video1.mp4
├── course1_video2.mp4
├── course1_video3.mp4
├── course1_video4.mp4
└── course1_video5.mp4

To start the project:
node server.js
