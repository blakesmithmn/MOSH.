require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const searchRouter = require('./routes/search.router');
const detailsRouter = require('./routes/details.router');
const commentsRouter = require('./routes/comments.router');
const eventsRouter = require('./routes/events.router');
const profilesRouter = require('./routes/profiles.router');
const spotifyRouter = require('./routes/spotify.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/details', detailsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/profiles', profilesRouter);
app.use('/api/spotify', spotifyRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
