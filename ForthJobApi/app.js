require('dotenv').config()
require('express-async-errors');
const express = require('express');
const app = express();

// connect database
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/authentication')

//import router
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

const helmet = require('helmet')
const xss = require('xss-clean')
const ratelimiter = require('express-rate-limit')

// error handler middleware

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('turst-proxy',1)
app.use(ratelimiter(
  {
    windowMs: 15 * 60 * 1000, // 15 minutes
	  limit: 100,
  }
))
app.use(express.json());
app.use(helmet())
app.use(xss())


//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

//middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
