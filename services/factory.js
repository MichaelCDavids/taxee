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
    let taxis = await pool.query(
      "select  route_one.route_name AS from_route, route_two.route_name AS to_route from taxi join routes route_one on route_one.id = taxi.taxi_from join routes route_two on route_two.id = taxi.taxi_to where taxi_from = $1 AND taxi_to = $2",
      [from, to]
    );

    let coOrdinates = await getRouteCordinates(from, to);

    localStorage.removeItem("coOrdinates");

    localStorage.setItem("coOrdinates", JSON.stringify(coOrdinates));

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

  async function getRouteCordinates(from, to) {
    let from_co_ordinates = await pool.query(
      "select latitude, longitude from co_ordinates where route_id =$1",
      [from]
    );

    let to_co_ordinates = await pool.query(
      "select latitude, longitude from co_ordinates where route_id =$1",
      [to]
    );

    let fromCoOrdinate = from_co_ordinates.rows[0];
    let toCoOrdinate = to_co_ordinates.rows[0];

    return { fromCoOrdinate, toCoOrdinate };
  }

  function getCordinates() {
    let cordinate = JSON.parse(localStorage.getItem("coOrdinates"));

    return cordinate;
  }

  function setDistance(distInM) {
    localStorage.setItem("distInM", distInM);
  }

  function getDistance() {
    let dist = localStorage.getItem("distInM");
    return dist;
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
    getRoutes,
    getCordinates,
    setDistance,
    getDistance
  };
};
