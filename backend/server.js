import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { Solved } from './models/Solved.js'

dotenv.config();

const app = express()
const port = 3000
const secretKey = process.env.JWT_SECRET;

const DB_URL = process.env.ATLAS_URL;

if (!DB_URL) {
  console.error("ATLAS_URL is undefined");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Successfully connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json());
app.use(cookieParser());


app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});


app.post('/solved', async (req, res) => {
  const email = req.cookies.email;
  console.log(email)
  const solved = await Solved.findOne({ email });

  // 🔐 IMPORTANT CHECK
  if (!solved) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  let already_solved = [];
  let level = [];

  for (let i = 1; i < 5; i++) {
    if (solved[`flag${i}`] && solved[`flag${i}`] !== '') {
      already_solved[i - 1] = solved[`flag${i}`];
      level.push(true);
    } else {
      level.push(false);
    }
  }

  res.json({
    success: true,
    already_solved,
    solved,
    level
  });
});


app.post('/solve', async (req, res) => {
  const email = req.cookies.email
  const time = new Date
  const hour = time.getHours()
  const minute = time.getMinutes();
  const seconds = time.getSeconds();
  const flag_time = `${hour}:${minute}:${seconds}`
  const { id, flag, points,current_score,new_score } = req.body
  let increase_score=parseInt(current_score)
  increase_score+=new_score
  const changeid = parseInt(id) + 1
  const point = parseInt(points) + 1
  const increased_point = String(point)
  const which_flag = `flag${changeid}`
  await Solved.updateOne(
    { email: email },
    { $set: { [which_flag]: flag, points: increased_point, flagtime: flag_time,score:increase_score} }
  )
  res.json({ success: true })
})

app.post('/scoreboard', async (req, res) => {
  const peoples = await Solved.find({})
  const collections = []
  let player = 0
  let solves = 0
  const toSeconds = (time) => {
    const [h, m, s = 0] = time.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  };

  peoples.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return toSeconds(a.flagtime) - toSeconds(b.flagtime);
  });

  for (let i = 0; i < peoples.length; i++) {
    player += 1
    solves += parseInt(peoples[i].points)
    collections.push({ id: i + 1, rank: i + 1, name: peoples[i].name, score: peoples[i].score, solves: peoples[i].points, avatar: peoples[i].avatar })
  }
  res.json({ success: true, collections: collections, total_solves: solves, players: player })
})

app.post('/login', async (req, res) => {
  const { username, email, avatar } = req.body
  const check_email = await Solved.findOne({ email })
  if (check_email) {
    await Solved.updateOne(
      { email: email },
      { $set: { avatar: avatar, name: username } }
    )
    let token = jwt.sign({ email: email }, secretKey, { expiresIn: '7d' });
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: false, sameSite: "lax" });
    res.cookie("email", email, { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true, secure: false, sameSite: "lax" });
    res.json({ success: true })
  }
  else {
    res.json({ success: false })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie("token")
  res.clearCookie("email")

  res.json({ message: "Logged out" });
});

app.post('/checklogin', async (req, res) => {
  const email = req.cookies.email
  if (email) {
    const names = await Solved.findOne({ email })
    const name = names.name
    res.json({ success: true, username: name })
  }
  else {
    res.json({ success: false })
  }
})

app.post('/unavailable', (req, res) => {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();
  if (totalMinutes >= 735) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
