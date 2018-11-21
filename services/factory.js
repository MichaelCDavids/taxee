module.exports = function(pool) {
  function start() {
    console.log("start Function Called !!!");
  }
  function end() {
    console.log("end Function Called !!!");
  }
  function tripInfoGet() {
    console.log("tripInfoGet Function Called !!!");
  }
  function tripInfoPost() {
    console.log("tripInfoPost Function Called !!!");
  }
  function fromTo() {
    console.log("fromTo Function Called !!!");
  }
  function setFromTo() {
    console.log("setFromTo Function Called !!!");
  }

  function getTaxisByOwner() {
    console.log("getTaxisByOwner Function Called !!!");
  }
  return {
    start,
    end,
    tripInfoGet,
    tripInfoPost,
    fromTo,
    setFromTo,
    getTaxisByOwner
  };
};
