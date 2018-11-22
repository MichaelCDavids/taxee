const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const pg = require("pg");
const FactoryFunction = require('./services/factory');
const Routes = require('./routes/routes');
const Pool = pg.Pool;
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/taxee_app_database';
const pool = new Pool({
    connectionString,
    ssl: useSSL
});
const Instance = FactoryFunction(pool);
const appRoutes = Routes(Instance);
const app = express();

// Middlewares
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(session({
    secret: 'taxee',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}
app.use(errorHandler);


var request = require('request'); // replace with your client information: developer.whereismytransport.com/clients
var CLIENT_ID = 'ea2eb61e-d200-48fa-99a7-d7940a4e76c8';
var CLIENT_SECRET = 'e29ZFkCgcan2ec8NcM0fOVY9Ib21hZSjoerTv586Ibw=';
var options = {
    method: 'POST',
    headers: 'ACCEPT: application/json',
    url: 'https://identity.whereismytransport.com/connect/token',
    form: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'client_credentials',
        scope: 'transportapi:all'
    }
};
request(options, function (error, response, body) {
    var TOKEN = JSON.parse(body).access_token; // subsequent requests go here, using the TOKEN
    var options = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + TOKEN
        },
        url: 'https://platform.whereismytransport.com/api/agencies'
    };
    request(options, function (error, response, body) {
        console.log({
            'Number of Agencies': JSON.parse(body).length
        });
    });
    var body = {
        geometry: {
          type: 'Multipoint',
          coordinates: [[18.5828324, -33.9923675], [18.416798, -33.912683]]
        }
      };
      var options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + TOKEN
        },
        url: 'https://platform.whereismytransport.com/api/journeys',
        body: JSON.stringify(body)
      };
      request(options, function (error, response, body) {
        // console.log(response);
        
        console.log({
          Journeys: JSON.parse(body).itineraries[0].distance
        });
      });
});





// Routes
app.get('/', appRoutes.indexGet);
app.post('/', appRoutes.indexPost);
// app.post('/start', appRoutes.start);
// app.post('/end', appRoutes.end);
// app.get('/trip_information',appRoutes.tripInformationGet)
// app.post('/trip_information',appRoutes.tripInformationPost)

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Taxee-App started and listening on port:', PORT);
});