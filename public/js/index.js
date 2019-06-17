// Waits for the document to be loaded
$(document).ready(function () {

  // API call to retrieve crop data
  var openFarmAPI = {
    getOpenFarmData: function (plant) {
      return $.ajax({
        url: "https://openfarm.cc/api/v1/crops/?filter=" + plant,
        type: "GET"
      });
    }
  };

  // Displays plant data
  var plantDetails = function (plant) {
    openFarmAPI.getOpenFarmData(plant).then(function (data) {
      // console.log(data.data[0].attributes.name);
      // console.log(data.data[0].attributes.binomial_name);
      // console.log(data.data[0].attributes.description);
      // console.log(data.data[0].attributes.sowing_method);
      // console.log(data.data[0].attributes.sun_requirements);
      var careDiv = $("<div>");
      careDiv.addClass("careInline");
      var name = $("<h3>").text(data.data[0].attributes.name);
      var binomialName = $("<p>").text("Binomial name(s): " + data.data[0].attributes.binomial_name);
      var description = $("<p>").text("Description: " + data.data[0].attributes.description);
      var sowingMethod = $("<p>").text("Sowing Method: " + data.data[0].attributes.sowing_method);
      var sunRequirements = $("<p>").text("Sun Requirements: " + data.data[0].attributes.sun_requirements);
      careDiv.attr("id", data.data[0].attributes.name);
      var save = $("<button>Save</button>");
      save.addClass("btn btn-success");
      save.attr("value", "Save");
      save.attr("name", data.data[0].attributes.name);
      save.attr("id", "save-care");
      var remove = $("<img>");
      remove.attr("src", "../images/remove.jpg");
      remove.addClass("remove");
      remove.attr("width", "25")
      remove.attr("name", data.data[0].attributes.name);
      careDiv.append(name, binomialName, description, sowingMethod, sunRequirements, save, remove);
      $("#cares").prepend(careDiv);
    })
  };

  // Handles entries from search bar & from saved cares
  function displayCare(plantDetails) {
    $(document).on("click", "#add-care", function (event) {
      // console.log($(this)[0].innerHTML);
      event.preventDefault();

      var newCare = $("#care-input").val().trim() || $(this)[0].innerHTML;
      // console.log(newCare);

      if ($(newCare).val() === "") {
        return false;
      }
      else {
        plantDetails(newCare);
        $("#care-input").val("");
      }
    });
  };

  // Saves cares to DB with hardcoded googleid
  $(document).on("click", "#save-care", function (event) {
    event.preventDefault();
    // console.log($(this)[0]);

    var care = {
      google_id: "100030891790192819001",
      plant: $(this)[0].name
    };
    // console.log(care);

    $.post("/api/usercares", care, function () {
      // console.log("added care");
      getSavedCares();
    });
  });

  // Deletes care details from view
  $(document).on("click", ".remove", function () {
    $(this).parent().fadeOut(300);
  });

  // Retrieves saved cares from DB
  function getSavedCares() {
    $.get("/api/usercares", function (data) {
      $("#saved-care-names").empty();
      var savedCare = $("<ul>");
      data.forEach(function (element) {
        console.log("getSavedCardes" + element);
        // console.log(element.plant);
        savedCare.append("<li><button type='button' id='add-care'>" + element.plant + "</button><img src='../images/x.png' width='20' class='delete' id=" + element.id + "></li>")


      })
      $("#saved-care-names").prepend(savedCare);


    })
  };

  // Deletes saved cares from DB
  $(document).on("click", ".delete", function (event) {
    var id = $(this)[0].id;
    // console.log("onclick id=" + id);

    $.ajax("/api/usercares/" + id, {
      type: "DELETE",
      success: function (result) {
        // console.log(result);
      }
    }).then(
      function () {
        console.log("care deleted");
        getSavedCares();
      }
    );
  });

  // Calls functions to view cares from search and saved queries
  getSavedCares();
  displayCare(plantDetails);

  // rain

  var makeItRain = function () {
    //clear out everything
    $('.rain').empty();

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 100) {
      //couple random numbers to use for various randomizations
      //random number between 98 and 1
      var randoHundo = (Math.floor(Math.random() * (98 - 1 + 1) + 1));
      //random number between 5 and 2
      var randoFiver = (Math.floor(Math.random() * (5 - 2 + 1) + 2));
      //increment
      increment += randoFiver;
      //add in a new raindrop with various randomizations to certain CSS properties
      drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
      backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver + randoFiver - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div><div class="splat" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.5' + randoHundo + 's;"></div></div>';
    }

    $('.rain.front-row').append(drops);
    $('.rain.back-row').append(backDrops);
  }

  $('.splat-toggle.toggle').on('click', function () {
    $('body').toggleClass('splat-toggle');
    $('.splat-toggle.toggle').toggleClass('active');
    makeItRain();
  });

  $('.back-row-toggle.toggle').on('click', function () {
    $('body').toggleClass('back-row-toggle');
    $('.back-row-toggle.toggle').toggleClass('active');
    makeItRain();
  });

  $('.single-toggle.toggle').on('click', function () {
    $('body').toggleClass('single-toggle');
    $('.single-toggle.toggle').toggleClass('active');
    makeItRain();
  });

  makeItRain();



  var isLoggedIn = require("../lib/helpers.js")
  if (isLoggedIn) {
    $("#googleSignIn").show();
    $("#logOutButton").hide();
  } else {
    $("#googleSignIn").hide();
    $("#logOutButton").show();
  }
});