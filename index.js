const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/User");
require("./services/passport");

//connect mongoose to mongo, and add useNewUrlParser: true   to solve the issue of deprecationWarning
mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDb Connected"))
  .catch(err => console.log(err));

const app = express();

app.use(
  cookieSession({
    // in cookie session, we need to define the time, and keys to encrypt the cookie
    maxAge: 30 * 24 * 60 * 60 * 1000, //how long the cookies can exist
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
//localhost: 5000
