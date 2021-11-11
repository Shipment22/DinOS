var dinnerminal = new (function() {
    this.p5inst = p => {
        let id = currActivity;                          // activity id
        let scrollX = 0;                                // scroll pos
        let scrollY = 0;
        let x = 0;                                      // lerped scroll pos
        let y = 0;

        let str = '';                                   // input string
        let recalnum = 1;                               // input to recal to
        let inputs = [];                                // recals
        let pos = 0;                                    // "caret" x in characters
        let tpos = 27.2 + pos * 10.800000190734863;     // "caret" x translated to pixels
        let ty = 20;                                    // "caret" y in pixels

        let hist = dinos.logs.join('\n\n');             // history/logs
        let path = '~';                                 // directory once i get a file system setup

        let fps = 0;                                    // frame rate (lerped so its easier to see)

        let logo;

        p.setup = function() {
            c = p.createCanvas(p.windowWidth, p.windowHeight);

            c.id('dinnerminal' + currActivity);
            activitys[currActivity].id = 'dinnerminal' + currActivity;

            p.textFont('mono');
            p.textSize(18);
            p.textLeading(20);
            p.noSmooth();

            logo = makeLogo();

            dinos.log('[type help for a list of commands]');
        }

        function update() {
            hist = dinos.logs.join('\n\n');
            tpos = 20 + (pos + path.length + 3) * 10.800000190734863;
            ty = (hist.split('\n').length + 2) * 20;
        }

        p.draw = function() {
            if (id === currActivity) {
                y = p.lerp(y, scrollY, 0.2);
                if (p.frameCount % 30 === 1) {
                    update();
                }

                p.background(48, 10, 36);

                p.image(logo, p.width - 450, p.height - 400);

                p.push();
                p.translate(0, -y);

                p.fill(234, 135, 198);
                p.text(hist, 20, 20); // all logs


                p.fill(255);
                p.text(path + ' > ' + str, 20, ty);

                if (p.frameCount % 60 < 30) {p.text('_', tpos, ty);}
                p.pop();


                p.fill(255);
                fps = p.lerp(fps, p.frameRate(), 0.1);
                p.text([fps.toFixed(3), y].join(' '), 0, p.height);

                if (p.frameRate() < 5 && fps < 5 && p.frameCount > 20) {
                    p.noLoop();
                }
            }
        }

        p.keyPressed = function() {
            if (id === currActivity) {

                if (p.key === 'Enter') {
                    dinos.currDir = path;
                    inputs.push(str);
                    dinos.log('$ ' + str);
                    dinos.cmd_run(str);
                    str = '';
                    recalnum = inputs.length;
                    pos = 0;
                    update();
                    scrollY = p.constrain(scrollY, ty + 100 - p.height, (hist.split('\n').length-1.8) * 20);
                } else if (p.keyIsDown(8)) {
                    str = str.split('');
                    str.splice(str.length - 1, 1);
                    str = str.join('');
                    if (str !== '') { pos --; }
                } else if (p.keyIsDown(38)) {
                    if (recalnum > 0) {recalnum --;}
                    str = inputs[recalnum] ? inputs[recalnum] : str;
                } else if (p.keyIsDown(40)) {
                    if (recalnum < inputs.length) {recalnum ++;}
                    str = inputs[recalnum] ? inputs[recalnum] : str;
                } else if (p.keyCode >= 48 || p.keyCode === 32) {
                    str += p.key;
                    pos ++;
                }
                update();
            }
        }

        // function calcDisplayHist() {
        //     let h = hist.split('\n');
        //     let why = p.floor((y / 20)) - 1;
        //     if (why < 0) { why = 0; }
        //     let yplush = why + p.floor(p.height / 20) + 2;
        //     let s = h.slice(why, yplush).join('\n');
        //     displayHist = s;
        // }

        p.mouseWheel = function(event) {
            if (id === currActivity) {
                let scrollSize = 80;
                let pscrollY = scrollY;
                scrollY += event.delta < 0 ? -scrollSize : scrollSize;
                // if (scrollY > pscrollY + scrollSize) { scrollY = pscrollY + scrollSize; } 
                // else if (scrollY < pscrollY - scrollSize) { scrollY = pscrollY - scrollSize; }
                scrollY = p.constrain(scrollY, 0, (hist.split('\n').length-1.8) * 20);
                // calcDisplayHist();
            }
        }

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }

        function makeLogo() {
            let m;
            let g;
            let os;
            let dinner;
            m = p.createGraphics(500, 500, p.P2D);
            g = p.createGraphics(500, 500, p.P2D);
            let clrs = [
                p.color(114, 208, 246),
                p.color(239, 249, 252),
                p.color(233, 99, 181),
            ];
            g.noStroke();
            g.shearX(p.PI - 0.13);
            for (let i = 0; i < 5; i ++) {
                g.fill(multiLerpColor(clrs, p.constrain(i * 0.22, 0, 1)));
                g.rect(0, 70 + i * 60, p.width, 60);
            }

            // m.background(0);
            m.shearX(p.PI - 0.13);
            m.textAlign(p.CENTER, p.CENTER);
            m.textSize(300);
            m.fill(255);
            m.text('OS', 280, 270);
            let amt = 10;
            for (let i = amt; i > 0; i --) {
                m.fill(0, (amt - i * 0.1) * 5);
                m.text('OS', 280 + amt - i, 270 + amt - i);
            }

            os = g.get();
            os.mask(m.get());


            clrs = [
                p.color(254, 38, 97),
                p.color(45, 0, 36),
                p.color(45, 0, 36),
            ];
            g.noStroke();
            for (let i = 0; i < 20; i ++) {
                g.fill(multiLerpColor(clrs, p.constrain(i * 0.03, 0, 1)));
                g.rect(0, i * 3, p.width, 3);
            }

            m.clear();
            m.shearX(p.PI - 0.2); 
            m.textAlign(p.CENTER, p.CENTER);
            // m.translate(140, 160);
            // m.rotate(-PI / 9);
            m.fill(255);
            m.textFont('flottflott');
            m.textSize(70);
            m.text('Dinner', 200, 32);

            dinner = g.get();
            dinner.mask(m.get());

            g.clear();
            g.image(os, 0, 0);
            g.push();
            g.imageMode(p.CENTER);
            g.translate(260, 340);
            g.rotate(-p.PI / 8);
            g.image(dinner, 0, 0);
            g.pop();

            return g.get();
        }

        function multiLerpColor (listOfColors, amount) {
          amount = p.map(amount, 0, 1, 0, arguments[0].length-1);
          var amt = amount - p.floor(amount);
          amount = p.floor(amount);
          return p.lerpColor(arguments[0][amount], arguments[0][amount+1], amt);
        }
    };
});

enviormentSetups.dinnerminal = (function() {
    dinos.log('dinnerminal setup started.');

    if (dinos.hasp5()) {
        new p5(dinnerminal.p5inst);
    }
});
