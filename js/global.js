// GLOBALS
const w        = window.innerWidth - 50;
const h        = 2 * window.innerHeight/3;
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
let dir        = [0, 1]; // current direction to be compared with each of the possible ones
let stopping   = false; // keeps track of when to draw the convex hull
let best; //keeps track at the index of the point that should be added to the hull;
let vector; // vector to be calculated every frame
let current; // keeps track of the current point in the hull
let algorithm; // wether the algorithm should be running or not
let mousepos; // keeps track of mouse/touch pos to add/remove points