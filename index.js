import express from 'express';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import webhookRouter from './routes/webhookRoutes.js';
import connectDB from './lib/connectDb.js';
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

const app = express();
app.use(clerkMiddleware());
app.use('/webhooks', webhookRouter);
app.use(express.json());

app.use(cors(process.env.CLIENT_URL));

// allow cross-origin requests
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// app.get('/auth-state', (req, res) => {
//   const authState = req.auth;
//   res.json(authState);
// });

// app.get('/protected', (req, res) => {
//   const { userId } = req.auth;
//   if (!userId) {
//     return res.status(401).json('Not authorized');
//   }
//   return res.status(200).json('Successful');
// });

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message || 'Something went wrong!',
    status: error.status,
    stack: error.stack,
  });
  next();
});

app.listen(3000, () => {
  connectDB();
  console.log('Server is running concurrently!');
});
