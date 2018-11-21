module.exports = function (instance) {
    async function indexGet(req, res) {
        // await instance.someFunction()
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
        req.flash('info',{ message })
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