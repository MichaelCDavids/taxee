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
