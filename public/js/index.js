var publicData = [];


var API = {
    getPublicData: function () {
        return $.ajax({
            url: "api/plants",
            type: "GET"
        });
    }
};

var refreshPlants = function () {
    API.getPublicData().then(function (data) {
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i]);
            publicData.push(data[i].sm_20);
        };
        console.log(publicData);
        displayGraph();


    })
}

refreshPlants();


var pointsInInterval = 4;


function displayGraph() {
    Highcharts.chart('container', {
        chart: {
            margin: [50, 0, 50, 50],
            events: {
                load: function () {
                    Highcharts.each(this.series[0].data, function (point, i) {
                        var labels = ['4σ', '3σ', '2σ', 'σ', 'μ', 'σ', '2σ', '3σ', '4σ'];
                        if (i % pointsInInterval === 0) {
                            point.update({
                                color: 'black',
                                dataLabels: {
                                    enabled: true,
                                    format: labels[Math.floor(i / pointsInInterval)],
                                    overflow: 'none',
                                    crop: true,
                                    y: -2,
                                    style: {
                                        fontSize: '13px'
                                    }
                                }
                            });
                        }
                    });
                }
            }
        },

        title: {
            text: "National Soil Moisture"
        },

        legend: {
            enabled: true
        },

        xAxis: [{
            title: {
                text: 'Data'
            },
            visible: true
        }, {
            title: {
                text: 'Bell curve'
            },
            opposite: true,
            visible: true
        }],

        yAxis: [{
            title: {
                text: 'Soil Moisture % (sm_20)'
            },
            visible: true
        }, {
            title: {
                text: 'Bell curve'
            },
            opposite: true,
            visible: true
        }],

        series: [{
            name: 'Bell curve asd',
            type: 'bellcurve',
            xAxis: 1,
            yAxis: 1,
            pointsInInterval: pointsInInterval,
            intervals: 4,
            baseSeries: 1,
            zIndex: -1,
            marker: {
                enabled: true
            }
        }, {
            name: 'Data',
            type: 'scatter',
            data: publicData,
            visible: true,
            marker: {
                radius: 1.5
            }
        }]
    });
};

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


$("#createAccountButton").on("click", function () {
    let newUserName = $("#newUserName").val().trim();
    let newPassword1 = $("#newPassword1").val().trim();
    let newPassword2 = $("#newPassword2").val().trim();
    if (newPassword1 === newPassword2) {
        console.log("Password accepted");
        // if username doesn't exist, create user in database
            // sign user in
        // if username does exist, alert it's already in use
    } else {
        alert("Passwords don't match");
    }
})
module.exports(newUserName, newPassword1);