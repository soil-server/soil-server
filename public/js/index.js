var openFarmAPI = {
  getOpenFarmData: function (plant) {
    return $.ajax({
      url: "https://openfarm.cc/api/v1/crops/?filter=" + plant,
      type: "GET"
    });
  }
};

var plantDetails = function (plant) {
  openFarmAPI.getOpenFarmData(plant).then(function (data) {
    console.log(data);
    
  })
};

plantDetails("watermelon");

