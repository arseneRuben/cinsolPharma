const express = require("express");
const cors = require("cors");
const app = express();
const cookieSession = require("cookie-session")
const passport = require("passport")
require("dotenv").config()

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// synchronize
const db = require("./app/models");
const Group = db.groups;


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
app.use('/gauth', require('./app/routes/passport'));

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// Adding required middlewares
app.use(cookieSession({
  name: 'authSession',
  keys: ["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"],
  maxAge: 24*60*60*100
}))

// CORS - Cross Origin Resource Sharing, our Frontend will be runing on different port (3000) and our Backend will run of 5000, it so how can frontend access backend, so we need to connect it, thats the reason we are using CORS.
app.use(cors({
  origin: "http://localhost:3000",  //only localhost:3000 can access this server
  credentials: true  //Responding with this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests. 
}))


app.use(passport.initialize())
app.use(passport.session());

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

function initial() {
  Group.create({
    id: 1,
    name: "user"
  });
 
  Group.create({
    id: 2,
    name: "moderator"
  });
 
  Group.create({
    id: 3,
    name: "admin"
  });
}


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

