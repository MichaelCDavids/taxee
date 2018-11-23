<<<<<<< HEAD
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
=======
module.exports = function (instance) {
    async function indexGet(req, res) {
        // await instance.someFunction()
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
                    coordinates: [
                        [18.5828324, -33.9923675],
                        [18.416798, -33.912683]
                    ]
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
                let distanceInMeters = JSON.parse(body).itineraries[0].distance.value
                console.log({
                    Journeys: distanceInMeters
                });
                let eta  = await instance.getTime(distanceInMeters)
            });
        });
        res.render('index');
    };
    async function indexPost(req, res) {

        res.render('index');
    };
    async function start(req, res) {
        //start tracking user journey
        await instance.start()
        res.render('trip');
    };
    async function end(req, res) {
        //end tracking journey and save journey
        await instance.end()
        res.render('trip');
    };
    async function tripInformationGet(req, res) {
        await instance.tripInfoGet()
        res.render('trip');
    };
    async function tripInformationPost(req, res) {
        let message = await instance.tripInfoPost()
        req.flash('info', {
            message
        })
        res.render('trip');
    };

    return {
        indexGet,
        indexPost,
        start,
        end,
        tripInformationGet,
        tripInformationPost,
    };
};
>>>>>>> 2ace1c36d9e200e59c8f0c8c856912d7d660b739
