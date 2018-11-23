<<<<<<< HEAD
const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./taxi_id");

module.exports = function(pool) {
  async function start() {
    console.log("start Function Called !!!");
  }
  async function end() {
    console.log("end Function Called !!!");
  }
  async function tripInfoGet() {
    console.log("tripInfoGet Function Called !!!");
  }
  async function tripInfoPost() {
    console.log("tripInfoPost Function Called !!!");
  }
  async function fromTo(from, to) {
    console.log(from, to)
    let taxis = await pool.query(
      "select route_one.route_name AS from_route, route_two.route_name AS to_route from taxi join routes route_one on route_one.id = taxi.taxi_from join routes route_two on route_two.id = taxi.taxi_to where taxi_from = $1 AND taxi_to = $2",
      [from, to]
    );

    return taxis.rows;
  }
  async function setFromTo(from, to) {
    let reg = localStorage.getItem("reg");
    await pool.query(
      "UPDATE taxi SET taxi_from = $1, taxi_to = $2 WHERE registration_number = $3",
      [from, to, reg]
    );

    return "success";
  }

  async function setReg(regId) {
    localStorage.removeItem("reg");
    localStorage.setItem("reg", regId);

    return "success";
  }
  async function getAllRoutes() {
    let getRoutes = await pool.query("select route_name from routes");
    return getRoutes.rows;
  }

  async function getTaxisByOwner(fullname) {
    let ownerIdList = await pool.query(
      "SELECT id from taxi_owner WHERE owner_name = $1",
      [fullname]
    );

    let ownerId = ownerIdList[0];

    let ownerTaxis = await pool.query(
      "SELECT * FROM taxi WHERE owned_by = $1",
      [ownerId]
    );

    return ownerTaxis.rows;
  }

  async function getRegistrations() {
    let registrationList = await pool.query("SELECT * FROM registrations");

    return registrationList.rows;
  }

  async function getRoutes() {
    let registrationList = await pool.query("SELECT * FROM routes");

    return registrationList.rows;
  }

  return {
    start,
    end,
    tripInfoGet,
    tripInfoPost,
    fromTo,
    setFromTo,
    getTaxisByOwner,
    getAllRoutes,
    setReg,
    getRegistrations,
    getRoutes
  };
};
=======
module.exports = function (pool) {
    function getTime (distance){
        eta = distance/averagespeed
        console.log('start Function Called !!!');
    };
    function end (){
        console.log('end Function Called !!!');
    }; 
    function tripInfoGet (){
        console.log('tripInfoGet Function Called !!!');
    };
    function tripInfoPost (){
        console.log('tripInfoPost Function Called !!!');
    };
     
    return {
        start,
        end,
        tripInfoGet,
        tripInfoPost
    };
};
>>>>>>> 2ace1c36d9e200e59c8f0c8c856912d7d660b739
