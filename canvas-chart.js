(function () {
  let lastTime = 0;
  let vendors = ['ms', 'moz', 'webkit', 'o'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    let currTime = new Date().getTime();
    let timeToCall = Math.max(0, 16 - (currTime - lastTime));
    let id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    },
      timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };

  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}());


let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.lineCap = "round";
ctx.lineJoin = "round";


// variable to hold how many frames have elapsed in the animation
let t = 1;

// path for plot animation
let vertices = [];
let length = 800
for (let i = 0; i < 800; i += 100) {
  if (i === 0) {
    vertices.push({ x: i, y: length })
    continue
  }
  length = length - 100

  vertices.push({ x: i, y: length })
}

// style
ctx.lineWidth = 10;
ctx.strokeStyle = "#e9b10e";
// calculate points along the path
let points = calculatePath(vertices);
// extend the line from start to finish with animation
console.log(points)
animate(points);


// calc pathpoints traveling along vertices
function calculatePath(vertices) {
  let pathpoints = [];
  for (let i = 1; i < vertices.length; i++) {
    let pt0 = vertices[i - 1];
    let pt1 = vertices[i];
    let dx = pt1.x - pt0.x;
    let dy = pt1.y - pt0.y;
    for (let j = 0; j < 100; j++) {
      let x = pt0.x + dx * j / 100;
      let y = pt0.y + dy * j / 100;
      pathpoints.push({
        x: x,
        y: y
      });
    }
  }
  return (pathpoints);
}


function animate() {
  if (t < points.length - 1) {
    requestAnimationFrame(animate);
  }
  
  ctx.beginPath();
  ctx.moveTo(points[t - 1].x, points[t - 1].y);
  ctx.lineTo(points[t].x, points[t].y);
  
  ctx.stroke();
  // increment "t" to get the next waypoint
  t += 2;

}


const xAxis = document.getElementById('x-axis')
const yAxis = document.getElementById('y-axis')
//Time interval
let intervalArr = [1, 2]

//plot x axis based on/08 data fetched
setTimeout(() => {
  setInterval(() => {
    xAxis.textContent = ''
    for (let i = 0; i < intervalArr.length; i++) {
      intervalArr[i] = intervalArr[i] + 1
      let childNode = document.createElement('div');
      childNode.textContent = `${intervalArr[i]}s`;
      xAxis.appendChild(childNode)
      if (intervalArr.length < 5) {
        console.log(intervalArr)
        intervalArr.push(intervalArr[i] + 2)
      }
    };
  }, 1000)
},
  5000)

  //initial values
let yAxisData = [0.2, 0.4, 0.6, 0.8, 1]

//plot y-axis based on data fetched
setInterval(() => {
  yAxis.textContent = ''
  for (let i = 0; i < 5; i++) {
    yAxisData[i] = yAxisData[i] + 0.2
    document.getElementById('overlay').textContent = `${yAxisData[i].toFixed(2)}x`

    document.getElementById("overlay").style = "color:white";

    if (yAxisData[i].toFixed(1)%2 ==0) {
      document.getElementById("overlay").style = "color:rgb(233 177 14)";
    }

    var outcomes = document.getElementsByClassName('outcomes')
    for (let j = 0; j < outcomes.length; j++) {
      if (yAxisData[i].toFixed(1)%2 ==0) {
        outcomes[j].classList.remove('bg-dark-1', 'light-tx-1')
        outcomes[j].classList.add('bg-gold')
        continue
      }
      outcomes[j].classList.remove('bg-gold')
      outcomes[j].classList.add('bg-dark-1', 'light-tx-1')

    }

    let childNode = document.createElement('div');
    childNode.textContent = `${yAxisData[i].toFixed(1)}x`;
    yAxis.appendChild(childNode)
  };
}, 1000)



//do the the same for the image canvas
let canvas2 = document.getElementById("canvas2");

let ctx2 = canvas2.getContext("2d");
ctx2.lineCap = "round";
ctx2.lineJoin = "round";

ctx2.lineWidth = 10;
ctx2.strokeStyle = "#e9b10e";

let points2 = calculatePath2(vertices);
console.log(points2)

let image = new Image()
image.src = 'rocket.png'

animate2(points);


function calculatePath2(vertices) {
  let pathpoints2 = [];
  for (let i = 1; i < vertices.length2; i++) {
    let pt0 = vertices[i - 1];
    let pt1 = vertices[i];
    let dx = pt1.x - pt0.x;
    let dy = pt1.y - pt0.y;
    for (let j = 0; j < 12; j++) {
      let x = pt0.x + dx * j / 100;
      let y = pt0.y + dy * j / 100;
      pathpoints2.push({
        x: x,
        y: y
      });
    }
  }
  return (pathpoints2);
}

function animate2() {
  if (t < points.length - 1) {
    requestAnimationFrame(animate2);
  }

  ctx2.clearRect(0, 0, canvas.width, canvas.height)
  // console.log(t)
  if (t >= 700) {
    ctx2.drawImage(image, 700 - 100, 100 - 100, 200, 200)
  }
  else {
    // ctx2.appendChild()
    ctx2.drawImage(image, points[t].x - 100, points[t].y - 100, 200, 200)

    ctx2.stroke();
    t++;
  }
}
