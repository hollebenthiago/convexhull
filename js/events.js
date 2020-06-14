function onClick(event) {
    var rect = document.getElementById('defaultCanvas0').getBoundingClientRect();
    if (event.type == 'click' || event.type == 'touchstart') {
        mousepos = {x: (event.clientX - rect.left) / (rect.right - rect.left) * w,
            y: (event.clientY - rect.top) / (rect.bottom - rect.top) * h
        };
        algorithm = false   
        resetArgs();
        stopping  = false
        let better = 100000;
        let diff;
        let index;
        for (i = 0; i < xs.length; i++) {
            diff = Math.sqrt((canvas_xs[i] - mousepos.x)**2 + (canvas_ys[i] - mousepos.y)**2)
            if (diff < better) {
                index  = i;
                better = diff;
            }
        }
        if (better < 10) {
            removefromArray(xs, xs[index])
            removefromArray(ys, ys[index])
            removefromArray(canvas_xs, canvas_xs[index])
            removefromArray(canvas_ys, canvas_ys[index])
        }
        else {
            xs.push(map(mousepos.x , 0, width, -0.1, 1.1))
            ys.push(map(mousepos.y , 0, height, -0.1, 1.1))
            canvas_xs.push(mousepos.x)
            canvas_ys.push(mousepos.y)
        }
        loop()
    }
} 