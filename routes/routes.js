module.exports = function(instance) {
  async function indexGet(req, res) {
    // await instance.someFunction()
    res.render("index");
  }
  async function indexPost(req, res) {
    res.render("index");
  }

  async function getFromTo(req, res) {
    let from = req.body.from;
    let to = req.body.to;
    let taxis = await instance.fromTo(from, to);
    res.json(taxis);
  }
  async function setFromTo(req, res) {
    let from = req.body.from;
    let to = req.body.to;
    let message = await instance.setFromTo(from, to);
    req.json(message);
    //  res.render("trip");
  }

  async function start(req, res) {
    //start tracking user journey
    await instance.start();
    res.render("trip");
  }
  async function end(req, res) {
    //end tracking journey and save journey
    await instance.end();
    res.render("trip");
  }
  async function tripInformationGet(req, res) {
    let regNo = req.body.regNo;
    let tripInfo = await instance.tripInfoGet(regNo);
    res.json(tripInfo);
  }
  async function tripInformationPost(req, res) {
    let regNo = req.body.regNo;
    let message = await instance.tripInfoPost();
    res.json(message);
    //  res.render("trip");
  }

  async function getTaxisByOwner(req, res) {
    let ownerName = req.body.fullname;
    let taxis = await instance.getTaxisByOwner(ownerName);
    res.json(taxis);
  }

  return {
    indexGet,
    indexPost,
    getFromTo,
    setFromTo,
    start,
    end,
    tripInformationGet,
    tripInformationPost,
    getTaxisByOwner
  };
};
