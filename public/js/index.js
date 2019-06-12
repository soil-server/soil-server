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