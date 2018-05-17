# vidjot

### init git repository

### project dependencies

```
1. npm install -g nodemon (auto restart server)
2. npm install --save express
3. npm install --save express-handlebar (template engine)
```

### Create Handlebar

```
1. Create Middleware
const exphbs = require("express-handlebars");

// express handlebar middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

2. Create Views Folder
- views/index.handlebars (Index Section View)
- views/about.handlebars (About Section View)
- views/layouts/main.handlebars (HTML Body View)
- views/partials/_navbar.handlebars (Partial Body / Navgiation Bar)
```
