let slider;

function setup() {
    
    // creating button to add random point
    var genrandbtn = createButton('Generate random points');
    genrandbtn.parent('buttonsHere')

    // creating button to add random point
    var addrandbtn = createButton('Add a random point');
    addrandbtn.parent('buttonsHere')

    // creating button to remove a random point
    var removerandbtn = createButton('Remove a random point');
    removerandbtn.parent('buttonsHere')

    // creating button to (re)start the algorithm
    var algbtn = createButton('Start/Restart the algorithm');
    algbtn.parent('buttonsHere')

    // creating slider to change speed
    slider = createSlider(1, 30, 5, 1)
    
    genrandbtn.mousePressed(() => {
        algorithm = false
        stopping  = false
        resetArgs();
        xs        = []
        ys        = []
        canvas_xs = []
        canvas_ys = []
        for (let i = 0; i < num_points; i++) {
            xs.push(Math.random())
            ys.push(Math.random())
            canvas_xs.push(map(xs[i], -0.1, 1.1, 0, width))
            canvas_ys.push(map(ys[i], -0.1, 1.1, 0, height))
        }
        loop()
    })

    addrandbtn.mousePressed(() => {
        algorithm = false
        stopping  = false
        resetArgs();
        num_points ++
        xs.push(Math.random())
        ys.push(Math.random())
        canvas_xs.push(map(xs[xs.length - 1], -0.1, 1.1, 0, width))
        canvas_ys.push(map(ys[ys.length - 1], -0.1, 1.1, 0, height))
        loop()
    })

    removerandbtn.mousePressed(() => {
        algorithm = false
        stopping  = false
        resetArgs();
        num_points --
        let random = xs.length * Math.random()
        removefromArray(xs, xs[Math.floor(random)])
        removefromArray(ys, ys[Math.floor(random)])
        removefromArray(canvas_xs, canvas_xs[Math.floor(random)])
        removefromArray(canvas_ys, canvas_ys[Math.floor(random)])
        loop()
    })

    algbtn.mousePressed(() => {
        algorithm = true   
        resetArgs();
        stopping  = false
        loop()
    })

    frameRate(fr);
    var canvas = createCanvas(w, h);
    canvas.parent('canvasHere')
    document.getElementById('defaultCanvas0').addEventListener('click', onClick);
    document.getElementById('defaultCanvas0').addEventListener('mouseup', ()=> {
        loop();
    });
}

function draw() {
    clear()
    let val = slider.value()
    frameRate(val);
    if (hull.length == 0) {
        hull.push(xs.indexOf(Math.min(...xs)))
    }
    current = hull[hull.length - 1]
    for (let i = 0; i < xs.length; i++) {
        strokeWeight(1);
        if (hull.includes(i)) {
            fill('green')
            circle(canvas_xs[i], canvas_ys[i], 10)
        }
        else if (counter == i) {
            fill('blue')
            circle(canvas_xs[i], canvas_ys[i], 10)
        }
        else if (i == best) {
            fill('red')
            circle(canvas_xs[i], canvas_ys[i], 10)
        }
        else {
            fill('white')
            circle(canvas_xs[i], canvas_ys[i], 10)
        }
    }
    strokeWeight(1)    
    line(canvas_xs[current], canvas_ys[current], canvas_xs[counter], canvas_ys[counter])
    stroke('green')
    strokeWeight(3)
    for (let i = 0; i < hull.length - 2; i++) {
        line(canvas_xs[hull[i]], canvas_ys[hull[i]], canvas_xs[hull[i+1]], canvas_ys[hull[i+1]])
    }
    stroke(0)
    if (algorithm) {
        vector = [canvas_xs[counter] - canvas_xs[current], canvas_ys[counter] - canvas_ys[current]]
        angle = dot(vector, dir)/(norma(vector) * norma(dir))
        stroke('red')
        line(canvas_xs[current], canvas_ys[current], canvas_xs[best], canvas_ys[best])
        stroke(0)
        noFill()
        strokeWeight(1)
        // arc drawing
        // let dx1 = canvas_xs[current] + 0.4 * (canvas_xs[best] - canvas_xs[current])
        // let dy1 = canvas_ys[current] + 0.4 * (canvas_ys[best] - canvas_ys[current])
        // let dx2 = canvas_xs[current] + 0.4 * dir[0]
        // let dy2 = canvas_ys[current] + 0.4 * dir[1]
        // a1 = Math.atan2(dy1, dx1)
        // a2 = Math.atan2(dy2, dx2)
        // console.log(a1, a2)
        // arc(canvas_xs[current], canvas_ys[current], 70, 70, a1, a2)
        if (angle > compare) {
            compare = angle
            best    = counter
        }
        strokeWeight(1);
        if (!stopping) {

            line(canvas_xs[hull[hull.length - 1]], canvas_ys[hull[hull.length - 1]], canvas_xs[hull[hull.length - 1]] + width * dir[0], canvas_ys[hull[hull.length - 1]] + width * dir[1])
            line(canvas_xs[hull[hull.length - 1]], canvas_ys[hull[hull.length - 1]], canvas_xs[hull[hull.length - 1]] - width * dir[0], canvas_ys[hull[hull.length - 1]] - width * dir[1])
        }
        
        counter++
        if (counter == xs.length) {
            hull.push(best)
            if (best != hull[0]) {
            }
            else {
                stopping = true;
            }
            dir = [canvas_xs[best] - canvas_xs[hull[hull.length - 2]], canvas_ys[best] - canvas_ys[hull[hull.length - 2]]]
            counter = counter - xs.length
            compare = -1;
        }

        if (stopping) {
            clear();
            for (let i = 0; i < xs.length; i++) {
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
            noLoop()      
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 50, 2 * windowHeight/3);
    console.log('a')
}