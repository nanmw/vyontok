const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');


const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const viewRouter = require('./routes/viewRoutes');


const app = express();

// app.enable('trust proxy');

app.use(
  helmet({
    contentSecurityPolicy: {
      // useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://api.mapbox.com", "https://cdnjs.cloudflare.com"],
        workerSrc: ["'self'", "blob:"],
        connectSrc: ["'self'", "https://*.mapbox.com", "ws://*.mapbox.com", "wss://*.mapbox.com", "ws://127.0.0.1:62145/", "ws://127.0.0.1:57181/"],
        frameSrc: ["'self'", "https://api.mapbox.com", "https://www.google.com/"]
      },
    },
  }),
);

// 1) GLOBAL MIDDLEWARES
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving static files.
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from same API.
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json({
  limit: '10kb'
}));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection.
app.use(mongoSanitize());

// Data sanitization against XSS.
app.use(xss());

// Prevent parameter pollution.
app.use(hpp({
  whitelist: [
    'causeGoal',
    'title',
    'category',
    'causeDonations',
    'tags',
    'comments',
    'socials',
    'createdAt'
  ]
}));

app.use(compression());

// TEST
app.use((req, res, next) => {
  // console.log(req.cookies);
  next();
})


// ROUTES
app.use('/', viewRouter);
// app.use('/api/v1/causes', causeRouter);
// app.use('/api/v1/events', eventRouter);
// app.use('/api/v1/blogs', blogRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/comments', commentRouter);
// app.use('/api/v1/replies', replyRouter);
// app.use('/api/v1/donations', donationRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;