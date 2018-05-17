const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// express handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Index route
app.get("/", (req, res) => {
  const title = "Vidjot Title";
  res.render("index", { title });
});

// About route
app.get("/about", (req, res) => {
  res.render("about");
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
