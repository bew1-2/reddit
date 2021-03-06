// MIDDLEWARE IMPORTS
require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

// ROUTE IMPORTS
const indexRouter = require('./routes/index');
const postRouter = require('./routes/post');
const commentRouter = require('./routes/comment');
const subredditsRouter = require('./routes/subreddit');
const authRouter = require('./routes/auth');
const replyRouter = require('./routes/reply')

// SETTING DB AND MONGOOSE CONNECTION
require('./data/reddit-db');

// INSTANCE OF EXPRESS
const server = express();

//  REQ/RES MIDDLEWARE
server.use(cookieParser());
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());
server.use(expressValidator());

//  HANDLEBARS (CLIENT SIDE RENDERING)
server.engine('handlebars', handlebars({ defaultLayout: 'main' }));
server.set('view engine', 'handlebars');

// CUSTOM ROUTE MOUNTS
server.use('/', indexRouter);
server.use('/posts', postRouter);
server.use('/r', subredditsRouter);
server.use('/posts', commentRouter);
server.use('/users', authRouter);
server.use('/', replyRouter);

// PORT
const port = process.env.PORT;
server.listen(port);

module.exports = server;
