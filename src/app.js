const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const cookieParser = require('cookie-parser');;

var session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const uuid = require('uuid/v4');

const app = express();

const slacClient = require('./slackClient');

// setup middlewares
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(cookieParser())
 app.use(session({
    genid: (req) => {
        console.log('Inside the session middleware')
        console.log(req.sessionID)
        return uuid() // use UUIDs for session IDs
      },
      store: new FileStore(),
    secret: "deadbeaf",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    (username, password, done) => {

        if(user.username == username && user.password == password) {
            return done(null, user)
        }
        else {
            return done(null, false, {message: "incorrect username/pass"});
        }
    }));

  // tell passport how to serialize the user
passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) => {
    // get user by id, otherwise return false
    db.Users.byEmail(id.email)
        .then(user =>  done(null, user))
        .catch (err => done(err, false));
});

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '/views'))


app.get('/', (req,res) =>{

    const logedin = req.user ? true:false;
    const email = logedin ? req.user.email: "";

    res.render('pages/index',
    {
        title: "home",
        logedIn: logedin,
        email: email
    });
});

app.get('/login', (req, res) =>{
    console.log("Login GET");
   
    res.render('pages/login', 
    {
        title: "Login"
    });
});

app.post('/login', (req,res) => {
   
    req.login(user, err => {
        return res.redirect(`/?name=${user.username}`);
    });                            
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/message', loggedIn, (req, res) => {
    
    let view ={title: "send message to slack",  status: ""};

    db.Users.byEmail(req.user.email)
        .then(user=>{

            console.log("message for user" + user);

            view.id = user.slack_id;
            view.email = user.email;
            //get conversations

            return slacClient.getConversations(user.slack_token, user.slack_id)
        })
        .then(con => {
            view.convs = con;
            res.render('pages/message', view)
        })
        .catch(err => {
            console.log(`ERROR MESSAGE: ${err.message}`);
            res.redirect('/message?error= ' + err.message);
        });
})

const db = require('./data');

app.post('/message', loggedIn, (req, res) => {
    const message = req.body.textMessage;
    const chanId = req.body.chanId;
    
    db.Users.byEmail(req.user.email)
        .then(user => slacClient.postMessage(message, chanId, user.slack_token))
        .then(status => {
            if (status.ok)
            {
                res.redirect('/message?status=ok');
            }
            else {
                throw new Error(status.error);
            }
        })
        .catch(err => {
            res.redirect('/message?error=' + err.message);
        });
});


function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

// setup controllers
require('./api/user')(app, '/api/user');
require('./api/number')(app, '/api/number');
require('./api/auth')(app, '/api/auth');
require('./api/bot')(app, '/api/bot');

module.exports = app;