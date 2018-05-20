const express = require("express");
const path  = require("path");
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');                  //Third Party Module handle form data.
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

//Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//passport config
require('./config/passport')(passport);

//DB config
const db = require('./config/database');

//Map Global promise -get rid warning  mongoose default labarary.
mongoose.Promise = global.Promise;


//Connect to Mongoose.
mongoose.connect(db.mongoURI, {
    useMongoClient: true
})
    .then( () => console.log('MongoDB is Connected..'))
    .catch(err => console.log(err));

//Handlebars Middleware use.
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Body Parser Middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Statics folder
app.use(express.static(path.join(__dirname, 'public')));

//Method override Middleware
app.use(methodOverride('_method'));


//express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  //passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

  //Global Variables
  app.use(function(req, res, next){
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
  });

//index Routes
app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});


//About Route or other page.
app.get('/about', (req, res) => {
    res.render('about');

});

//Used routes
app.use('/ideas', ideas);
app.use('/users', users);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Server Started on port' + ' ' + port);
});