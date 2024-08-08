import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import videoRoutes from './routes/video.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Importing cors
import path from 'path';

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

// Enable CORS
const allowedOrigins = ['http://localhost:5173', 'https://your-vercel-domain.vercel.app'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // If your frontend needs to send cookies
}));

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on the server');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
