module.exports = function(instance) {
  async function indexGet(req, res) {
    // await instance.someFunction()
    res.render("index");
  }
  async function indexPost(req, res) {
    res.render("index");
  }

  async function getFromTo(req, res, next) {
    try {
      let from = req.body.from;
      let to = req.body.to;
      let taxis = await instance.fromTo(from, to);
      res.json(taxis);
    } catch (error) {
      next(error);
    }
  }
  async function setFromTo(req, res, next) {
    try {
      let from = req.body.from;
      let to = req.body.to;
      let message = await instance.setFromTo(from, to);
      res.json(message);
    } catch (error) {
      next(error);
    }
  }

  async function setReg(req, res, next) {
    try {
      let regId = req.body.regId;
      let result = await instance.setReg(regId);
      res.json(result);
    } catch (error) {
      next(error);
    }
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

  async function getTaxisByOwner(req, res, next) {
    try {
      let ownerName = req.body.fullname;
      let taxis = await instance.getTaxisByOwner(ownerName);
      res.json(taxis);
    } catch (error) {
      next(error);
    }
  }

  async function getRegs(req, res, next) {
    try {
      let registrations = await instance.getRegistrations();
      res.json(registrations);
    } catch (error) {
      next(error);
    }
  }

  async function getRoutes(req, res, next) {
    try {
      let routes = await instance.getRoutes();
      res.json(routes);
    } catch (error) {
      next(error);
    }
  }

  return {
    indexGet,
    indexPost,
    getFromTo,
    setFromTo,
    setReg,
    start,
    end,
    tripInformationGet,
    tripInformationPost,
    getTaxisByOwner,
    getRegs,
    getRoutes
  };
};
