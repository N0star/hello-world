//const http = require('http');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require("./config/passport")(passport)

//const server = http.createServer((req,res) => {
//  res.end("adsdasd6");
//}); server.listen(3000);

//EJS
app.set('view engine','ejs');
app.use(expressEjsLayout);
//BodyParser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
 secret : 'secret',
 resave : true,
 saveUninitialized : true
}));
app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req,res,next)=> {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error  = req.flash('error');
next();
})


//const postRoutes = require("./rpost");
app.use(morgan("dev"));
//app.use('/', postRoutes);
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

//db connection
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,  useUnifiedTopology: true})
//mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('DB Connected - Success!!'))
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

const port = 3000;
app.listen(port, () => {console.log(`working on port ${port}`)});
