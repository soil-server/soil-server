//scatter plot graphs

// //adding class for css of hover
var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

data = [
  {
    date: "06-08-2019",
    time: "09:00",
    moisture: 800,
    temperature: 76.55,
    humidity: 59.22 
  },
  {
    date: "06-09-2019",
    time: "05:00",
    moisture: 500,
    temperature: 80.00,
    humidity: 52.55 
  },
  {
    date: "06-10-2019",
    time: "01:00",
    moisture: 300,
    temperature: 82.23,
    humidity: 51.25 
  },
  {
    date: "06-11-2019",
    time: "09:00",
    moisture: 100,
    temperature: 83.00,
    humidity: 50.01 
  },
  {
    date: "06-12-2019",
    time: "05:00",
    moisture: 90,
    temperature: 85.15,
    humidity: 49.00 
  },
  {
    date: "06-13-2019",
    time: "01:00",
    moisture: 30,
    temperature: 82.00,
    humidity: 47.00 
  }
];

// set the dimensions and margins of the graph
var margin = { top: 20, right: 50, bottom: 100, left: 70 },
  width = 1000 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%m-%d-%Y");
var parseHour = d3.timeParse("%I:%M");

// set the ranges for the axes
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// moisture graph
// define the line between the dots
var valueline1 = d3
  .line()
  .defined(d => !isNaN(d.moisture))
  .x(d => x(d.date))
  .y(d => y(d.moisture));
  
// Get the data
// d3.csv("data.csv", function(error, data) {
//   if (error) throw error;

// format the data
data.forEach(function(d) {
  d.date = parseTime(d.date);
  d.moisture = +d.moisture;
  // console.log(d.date);
  d.time = parseHour(d.time);
  // console.log(d.time);
});

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var chart1 = d3
  .select("#graph1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// Scale the axes with the range of the data
x.domain(
  d3.extent(data, function(d) {
    return d.date;
  })
);
y.domain([
  0,
  d3.max(data, function(d) {
    return d.moisture;
  })
]);

// / Add the valueline path.
chart1
  .append("path")
  .data([data])
  .attr("class", "line")
  .attr("d", valueline1)
  .attr("stroke", "#4682b4")
  .attr("stroke-width", 2)
  .attr("fill", "none");

//add data points
var path = chart1
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("r", 8)
  .attr("cx", function(d) {
    return x(d.date);
  })
  .attr("cy", function(d) {
    return y(d.moisture);
  })
  .attr("stroke", "#4682b4")
  .attr("stroke-width", 1.5)
  // .attr("fill", "#FFFFFF")
  .on("mouseover", function(d, i) {
    d3.select(this)
      .transition()
      .duration("100")
      .attr("r", 7);
    div
      .transition()
      .duration(100)
      .style("opacity", 1);
    div
      .html("The moisture was " + (d.moisture))
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY - 15 + "px");
  })
  .on("mouseout", function(d, i) {
    d3.select(this)
      .transition()
      .duration("200")
      .attr("r", 5);
    div
      .transition()
      .duration("200")
      .style("opacity", 0);
  });

// Add the x Axis
chart1
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%m-%d-%Y")));

// text label for the x axis
chart1
  .append("text")
  .attr(
    "transform",
    "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
  )
  .attr("fill", "#FFFFFF")
  .style("text-anchor", "middle")
  .text("Date");

// Add the y Axis
chart1.append("g").call(d3.axisLeft(y));

// text label for the y axis
chart1
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - height / 2)
  .attr("dy", "1em")
  .attr("fill", "#FFFFFF")
  .style("text-anchor", "middle")
  .text("Moisture");

// temperature graph
  var chart2 = d3
  .select("#graph2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var valueline2 = d3
  .line()
  .defined(d => !isNaN(d.moisture))
  .x(d => x(d.date))
  .y(d => y(d.temperature));

  // Scale the axes with the range of the data
x.domain(
  d3.extent(data, function(d) {
    return d.date;
  })
);
y.domain([
  0,
  d3.max(data, function(d) {
    return d.temperature;
  })
]);

// / Add the valueline path.
chart2
  .append("path")
  .data([data])
  .attr("class", "line")
  .attr("d", valueline2)
  .attr("stroke", "#FF0000")
  .attr("stroke-width", 2)
  .attr("fill", "none");

  //add data points
var path = chart2
.selectAll("dot")
.data(data)
.enter()
.append("circle")
.attr("r", 8)
.attr("cx", function(d) {
  return x(d.date);
})
.attr("cy", function(d) {
  return y(d.temperature);
})
.attr("stroke", "#FF0000")
.attr("stroke-width", 1.5)
// .attr("fill", "#FFFFFF")
.on("mouseover", function(d, i) {
  d3.select(this)
    .transition()
    .duration("100")
    .attr("r", 7);
  div
    .transition()
    .duration(100)
    .style("opacity", 1);
  div
    .html("The temperature was " + [d.temperature] + "°F")
    .style("left", d3.event.pageX + 10 + "px")
    .style("top", d3.event.pageY - 15 + "px");
})
.on("mouseout", function(d, i) {
  d3.select(this)
    .transition()
    .duration("200")
    .attr("r", 5);
  div
    .transition()
    .duration("200")
    .style("opacity", 0);
});

// Add the x Axis
chart2
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%m-%d-%Y")));

// text label for the x axis
chart2
  .append("text")
  .attr(
    "transform",
    "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
  )
  .attr("fill", "#FFFFFF")
  .style("text-anchor", "middle")
  .text("Date");

// Add the y Axis
chart2.append("g").call(d3.axisLeft(y));

// text label for the y axis
chart2
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - height / 2)
  .attr("dy", "1em")
  .attr("fill", "#FFFFFF")
  .style("text-anchor", "middle")
  .text("Temperature °F");
  
  //humidity graph
  var chart3 = d3
  .select("#graph3")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var valueline3 = d3
  .line()
  .defined(d => !isNaN(d.moisture))
  .x(d => x(d.date))
  .y(d => y(d.humidity));

  // Scale the axes with the range of the data
x.domain(
  d3.extent(data, function(d) {
    return d.date;
  })
);
y.domain([
  0,
  d3.max(data, function(d) {
    return d.humidity;
  })
]);

// / Add the valueline path.
chart3
  .append("path")
  .data([data])
  .attr("class", "line")
  .attr("d", valueline3)
  .attr("stroke", "#32CD32")
  .attr("stroke-width", 2)
  .attr("fill", "none");

  //add data points
var path = chart3
.selectAll("dot")
.data(data)
.enter()
.append("circle")
.attr("r", 8)
.attr("cx", function(d) {
  return x(d.date);
})
.attr("cy", function(d) {
  return y(d.humidity);
})
.attr("stroke", "#32CD32")
.attr("stroke-width", 1.5)
// .attr("fill", "#FFFFFF")
.on("mouseover", function(d, i) {
  d3.select(this)
    .transition()
    .duration("100")
    .attr("r", 7);
  div
    .transition()
    .duration(100)
    .style("opacity", 1);
  div
    .html("The relative humidity was " + [d.humidity] + "%")
    .style("left", d3.event.pageX + 10 + "px")
    .style("top", d3.event.pageY - 15 + "px");
})
.on("mouseout", function(d, i) {
  d3.select(this)
    .transition()
    .duration("200")
    .attr("r", 5);
  div
    .transition()
    .duration("200")
    .style("opacity", 0);
});

// Add the x Axis
chart3
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%m-%d-%Y")));


// text label for the x axis
chart3
  .append("text")
  .attr(
    "transform",
    "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
  )
  .attr("fill", "#FFFFFF")
  .style("text-anchor", "middle")
  .text("Date");

// Add the y Axis
chart3.append("g").call(d3.axisLeft(y));

// text label for the y axis
chart3
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - height / 2)
  .attr("dy", "1em")
  .attr("fill", "#FFFFFF")
  .style("text-anchor", "middle")
  .text("Relative Humidity %");

