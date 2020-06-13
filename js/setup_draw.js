// GLOBALS
let xs         = []; //x coordinates of points
let ys         = []; //y coordinates of points
let canvas_xs  = []; //canvas x coordinates of points
let canvas_ys  = []; //canvas y coordinates of points
let hull       = []; //indexes of boundary of convex hull
let num_points = 50; //number of points
let counter    = 0;  //keeps track of which point to check during animation 
let fr         = 30; //frame rate
let compare    = -1; // value between -1 and 1 to be compared every frame
let angle      = -1; // value that will be calculated every frame
let stopping = false; // keeps track of when to draw the convex hull
let dir        = [0, 1]; // current direction to be compared with each of the possible ones
let best; //keeps track at the index of the point that should be added to the hull;
let vector; // vector to be calculated every frame
let current; // keeps track of the current point in the hull


function norma(arr) {
    return Math.sqrt(arr[0]**2 + arr[1]**2)
}

function dot(arr1, arr2) {
    return arr1[0] * arr2[0] + arr1[1] * arr2[1]
}

for (let i = 0; i < num_points; i++) {
    xs.push(Math.random())
    ys.push(Math.random())
}

hull.push(xs.indexOf(Math.min(...xs)))

function setup() {
    frameRate(fr);
    var canvas = createCanvas(window.innerWidth - 100, 450);
    canvas.parent('canvasHere')
    var rect = document.getElementById('defaultCanvas0').getBoundingClientRect();
    for (let i = 0; i < num_points; i++) {
        canvas_xs[i] = map(xs[i], -0.2, 1.2, 0, width)
        canvas_ys[i] = map(ys[i], -0.2, 1.2, 0, height)
    }
}

function draw() {
    clear()
    current = hull[hull.length - 1]
    for (let i = 0; i < num_points; i++) {
        strokeWeight(1);
        if (hull.includes(i)) {
            fill('green')
            circle(canvas_xs[i], canvas_ys[i], 10)
        }
        else if (counter == i) {
            fill('blue')
            circle(canvas_xs[i], canvas_ys[i], 10)
        }
        else {
            fill('white')
            circle(canvas_xs[i], canvas_ys[i], 10)
        }
    }
    strokeWeight(1)    
    line(canvas_xs[current], canvas_ys[current], canvas_xs[counter], canvas_ys[counter])
    vector = [canvas_xs[counter] - canvas_xs[current], canvas_ys[counter] - canvas_ys[current]]
    angle = dot(vector, dir)/(norma(vector) * norma(dir))
    if (angle > compare) {
        compare = angle
        best    = counter
    }
    strokeWeight(3);
    if (!stopping) {
        line(canvas_xs[hull[hull.length - 1]], canvas_ys[hull[hull.length - 1]], canvas_xs[hull[hull.length - 1]] + width * dir[0], canvas_ys[hull[hull.length - 1]] + width * dir[1])
        line(canvas_xs[hull[hull.length - 1]], canvas_ys[hull[hull.length - 1]], canvas_xs[hull[hull.length - 1]] - width * dir[0], canvas_ys[hull[hull.length - 1]] - width * dir[1])
    }
    
    counter++
    if (counter == num_points) {
        hull.push(best)
        if (best != hull[0]) {
        }
        else {
            stopping = true;
        }
        dir = [canvas_xs[best] - canvas_xs[hull[hull.length - 2]], canvas_ys[best] - canvas_ys[hull[hull.length - 2]]]
        counter = counter - num_points
        compare = -1;
    }

    if (stopping) {
        clear();
        for (let i = 0; i < num_points; i++) {
            strokeWeight(1);
            if (hull.includes(i)) {
                fill('green')
                circle(canvas_xs[i], canvas_ys[i], 10)
            }
            else {
                fill('white')
                circle(canvas_xs[i], canvas_ys[i], 3)
            }
        }
        fill(color(0, 255, 0, 100))
        strokeWeight(3);
        beginShape()
        for (let i = 0; i < hull.length - 1; i++) {
            vertex(canvas_xs[hull[i]], canvas_ys[hull[i]])
        }
        endShape(CLOSE)
        console.log('yay')        
        noLoop();

    }

}