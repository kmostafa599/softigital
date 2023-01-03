var dps = [];
var updateInterval = 1000;

var chart = new CanvasJS.Chart("chartContainer", {  
  title: {
    text: "Image as marker on dynamic charts"
  },
  theme: "theme2",
  data: [
    {
      type: "spline",
      markerImageUrl:  "http://i.imgur.com/gzn48eN.png",
      dataPoints: dps
    }					
  ]
});

imageMarker = $("<img>").attr("src", chart.options.data[0].markerImageUrl)
  .css("display", "none")
  .css("height", 20)
  .css("width", 20)
  .appendTo($("#chartContainer>.canvasjs-chart-container"));

chart.render();

var xVal = dps.length + 1;
var yVal = 15;

var updateChart = function () {
  yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
  dps.push({ x: xVal,y: yVal });
  xVal++;
  if (dps.length > 10)
  {
    dps.shift();
  }
  chart.render();

  // Position image marker over the last/ current dataPoint
  positionMarkerImage(imageMarker, chart.options.data[0].dataPoints.length - 1);
};

function positionMarkerImage(imageMarker, index){ 
  var pixelX = chart.axisX[0].convertValueToPixel(chart.options.data[0].dataPoints[index].x);
  var pixelY = chart.axisY[0].convertValueToPixel(chart.options.data[0].dataPoints[index].y);

  imageMarker.css({"position": "absolute", 
                   "display": "block",
                   "top": pixelY - imageMarker.height()/2,
                   "left": pixelX - imageMarker.width()/2
                  });
}

var updateId = setInterval(function () { updateChart();}, updateInterval);

$(window).resize(function() {
  positionMarkerImage(imageMarker, chart.options.data[0].dataPoints.length - 1);
}); 