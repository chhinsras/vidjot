# vidjot

### init git repository

```
1.  Create .gitignore
2.  git init
3.  git add .
4.  git commit -am 'Your message'
5.  git remote add origin https://github.com/chhinsras/vidjod.git (Set the new remote)
6.  git remote -v (verifies the new remote URL)
7.  git pull --rebase origin master
8.  git push origin master
```

### project dependencies

```
1. npm install -g nodemon (auto restart server)
2. npm install --save express
3. npm install --save express-handlebar (template engine)
4. npm install --save mongoose (Database middleware working with MongoDB)
5. npm install --save body-parser (handle HTTP POST request in express.js, it extreact entire body portion of incoming request stream and expoeses it on req.body)
6. npm install --save method-override (to use put HTTP, this must be declared on top)
7. npm install --save express-session ( working with session)
8. npm intsall --save connect-flash (showing flash message)
9. npm install --save bcryptjs (hashing password)
10.npm install --save passport (middleware working with login)
11.npm install --save passport-local (local strategy)
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

### Create Local Mongo DB

```
1. Download and Install MongoDB
2. sudo mkdir -p /data/db ( Create database directory locally)
3. sudo chmod -R go+w /data/db ( Danger for production, /data/db is owned by root user, change mode to your current user)
4.
```

### Router

```
1. Create routers folder
2. Bring Model into specific route
// Load Models
require("../models/Idea");
const Idea = mongoose.model("ideas");
3. Load all routes into app.js
// Load Router
const ideas = require("./routes/ideas");
const users = require("./routes/users");
4. Use route inside app.js
// Use routes
app.use("/ideas", ideas);
app.use("/users", users);
```

### Create Public Folder for Project

```
1. Create public folder (public/css, public/img, public/js)
2. Bring path module into app.js (path is core node module)
3. Create static folder inside app.js
// Static Folder
app.use(express.static(path.join(__dirname, "public")));
4. Use assets
{{!-- public static assets folder, no need to put full address --}}
<img src="/img/logo.png" />
```

### Using Hash Password (bcryptjs)
