const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const flash = require("connect-flash");
const session = require("express-session");

const app = express();

// Load routes
const ideas = require("./routes/ideas");
const users = require("./routes/users");

// Passport config
require("./config/passport")(passport);

// get rid of global promise warining
mongoose.Promise = global.Promise;

// Connect to DB
const dbUrl = "mongodb://localhost/vidjot-dev";
mongoose
  .connect(dbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// express handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// method override middleware
app.use(methodOverride("_method"));

// Express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
    //  cookie: { secure: true }
  })
);

// Passport middleware (must put after express session middleware)
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());

// Global Varaible
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Index route
app.get("/", (req, res) => {
  const title = "Vidjot Title";
  res.render("index", { title });
});

// About route
app.get("/about", (req, res) => {
  res.render("about");
});

// Use routes
app.use("/ideas", ideas);
app.use("/users", users);

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
