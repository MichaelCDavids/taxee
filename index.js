const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const flash = require("express-flash");
const bodyParser = require("body-parser");
const pg = require("pg");
const FactoryFunction = require("./services/factory");
const Routes = require("./routes/routes");
const Pool = pg.Pool;
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://coder:pg123@localhost:5432/taxee_app_database";
const pool = new Pool({
  connectionString,
  ssl: useSSL
});
const Instance = FactoryFunction(pool);
const appRoutes = Routes(Instance);
const app = express();

// Middlewares
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "taxee",
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());
app.use(express.static(__dirname + "/public"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render("error", {
    error: err
  });
}
app.use(errorHandler);

// Routes
app.get("/", appRoutes.indexGet);
app.post("/", appRoutes.indexPost);
app.get("/get-from-to", appRoutes.getFromTo);
app.post("/set-from-to", appRoutes.setFromTo);
//app.post('/start', appRoutes.start);
// app.post('/end', appRoutes.end);
app.get("/trip_information", appRoutes.tripInformationGet);
app.post("/trip_information", appRoutes.tripInformationPost);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Taxee-App started and listening on port:", PORT);
});
