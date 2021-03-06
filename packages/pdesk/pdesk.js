var pdesk = new (function() {
    this.p5inst = p => {
        this.p = p;

        let id = currActivity; // activity ID

        dinos.memory.activitys[id] = {};
        let memory = dinos.memory.activitys[id]; // memory for activity
        
        memory.p5inst = this;

        memory.gui = new PizzaGui(p);
        let gui = memory.gui;

        memory.apps = [];
        let apps = memory.apps;

        memory.draggingApp = false;
        let draggingApp = memory.draggingApp;

        let appActive = false;
        memory.appActive = appActive;

        let fps = 0;

        p.setup = function() {
            let c = p.createCanvas(p.windowWidth, p.windowHeight);
            c.id('pdesk' + currActivity);
            activitys[currActivity].id = 'pdesk' + currActivity;

            c.elt.addEventListener("contextmenu",  e => { e.preventDefault(); });

            p.noCursor();

            apps.push(new PApp({
                title: 'Welcome!',
                x: p.width / 2 - 175,
                h: 150,
                setup: function() {
                    this.g.clear();
                    this.g.fill(0);
                    this.g.text('Welcome to PDesk! an extension for DinOS (Dinner OS), he "Desk" is desktop, and the "P" stands for Pizza, because Pizza is good.', 20, 30, this.w - 20);
                    this.g.fill('blue');
                    this.g.text('rules / terms of service', 30, 100);
                },
                onChange: function() {
                    (/*set icon*/ () => {
                        let g = p.createGraphics(50, 50);
                        g.fill(0);
                        g.rect(0, 0, 50, 50, 7);
                        g.textSize(10);
                        let t = 'Welcome!';
                        let ca = ['#f00', '#eb0', '#ff0', '#0f0', '#55f', '#cf00cf'];
                        let c = g.random(ca);
                        let r = g.random(5);
                        for (let i in t) {
                            let nc = g.random(ca);
                            while(c === nc) {
                                nc = g.random(ca);
                            }
                            c = nc;
                            g.fill(c);
                            g.text(t[i], 2 + g.textWidth(t.slice(0, i)), 30 + g.sin(i) * r);
                        }
                        this.iconImg = g.get();
                    })();
                },
                mousePressed: function() {
                    if (dinos.memory.activitys[currActivity].gui.mouseIsOver(this.x + 30, this.y + 115, 130, 15)) {
                        dinos.memory.activitys[currActivity].apps.push(new PApp(
                            {
                                title: 'you know the rules and so do i',
                                setup() {
                                    this.rick = 0;
                                },
                                draw: function() {
                                    this.g.clear();
                                    this.g.text(dinos.rickroll, 20, 30 - (this.p.frameCount) * 2 % 1300 + 300);
                                },
                                whenActive: function() {
                                    if (this.rick % 5 === 0) {
                                        (/*set icon*/ () => {
                                            let g = p.createGraphics(50, 50);
                                            g.fill(g.sin(this.rick / 70) * 255);
                                            g.rect(0,0,50,50,7);
                                            g.fill(g.sin(this.rick / 70) * -255);
                                            g.textSize(50 + g.sin(this.rick / 100) * 10);
                                            g.text(dinos.rickroll[g.floor(this.rick / 5)], 0, 50);
                                            this.iconImg = g.get();
                                        })();
                                    }
                                    this.rick++;
                                }
                            }
                        ));
                    }
                }
            }));

            dinos.cmd_run('gimme PAppConverter')

            dinos.cmd_add({
                name: ':P',
                fun: () => {
                    apps.push(new PApp(
                        {
                            title: ':P',
                            setup: function() {
                                // eval(convertToPApp(`rect(90,90,90,90)`, true))
                                // this.g.background('pink')
                                let that = this
                                eval(convertToPApp(``, true))
                            }
                        }
                    ))

                    let P = ''
                    for (let i = 0; i < 30; i ++) {
                        P += ':P\n'
                    }
                    return P
                },
                help: ':P',
                list: true
            })
            setTimeout(() => dinos.cmd_run(':P'), 20)

            dinos.cmd_add(
                {
                    name: 'terminal',
                    fun: o => {
                        apps.push(new PApp(
                            {
                                title: 'Dinnerminal (dinner terminal)',
            
                                x: 60,
                                y: 60,
            
                                w: 300 * 1.5,
                                h: 200 * 1.5, 
            
                                setup: function() {
                                    this.scrolly = 0
                                    this.maxScrolly = 0
                                    this.holdingScroller = false
            
                                    this.input = ''
                                    this.hist = []
                                    this.histI = 0
                                    this.login = 'bobert'
                                    this.compuername = 'dinos'
                                    this.path = '~'
            
                                    this.g.textFont('ubuntu mono, monospace') 
                                    this.g.textSize(16)
                                    this.g.textLeading(20)
            
                                    this.updateMaxScrolly = function() {
                                        this.maxScrolly = (this.logs.join('\n').split('\n').length -4) * 20
                                    }

                                    this.log('Hello :)')
                                },
            
                                draw: function() {
                                    if (this.p.mouseIsPressed && dinos.memory.activitys[currActivity].gui.mouseIsOver( this.x + this.w - 8, this.y + this.p.map(this.scrolly, 0, this.maxScrolly, 3, this.h - 100), 5, 70) || this.holdingScroller) {
                                            this.scrolly = this.p.constrain(this.p.map(this.p.mouseY - this.y, 0, this.h, 0, this.maxScrolly), 0, this.maxScrolly)
                                            this.holdingScroller = true
                                            this.ableToDragEdge = false
                                    } else if (this.p.keyIsPressed) {
                                        if (this.p.keyCode === 33) {
                                            this.scrolly -= 8
                                        } else if (this.p.keyCode === 34) {
                                            this.scrolly += 8
                                        }
                                        this.scrolly = this.p.constrain(this.scrolly, 0, this.maxScrolly )
                                    }
            
                                    this.g.stroke('#302')
                                    this.g.fill('#302')
                                    this.g.rect(0, 0, this.w, this.g.height, 0, 0, 10, 10)
            
                                    this.g.push()
                                    this.g.translate(0, -this.scrolly)
                                    this.g.fill(255)
                                    this.g.text(this.logs.join('\n'), 15, 15, this.g.width - 25)
                                    this.g.pop()
            
                                    this.g.fill(0)
                                    this.g.rect(0, this.h - 55, this.w, 30, 0, 0, 10)
                                    this.g.fill(255)
                                    this.g.text(`${this.login}@${this.compuername}:${this.path}$ ${this.input + (this.p.frameCount % 40 < 20 ? '_' : '')}`, 15, this.h - 50, this.g.width - 25)
            
                                    this.g.fill('pink')
                                    this.g.rect(this.w - 8, this.p.map(this.scrolly, 0, this.maxScrolly, 3, this.h - 100), 5, 70, 2)
                                },
            
                                keyPressed: function() {
                                    if (this.p.keyCode >= 48 || this.p.keyCode === 32) this.input += p.key 
                                    else if (this.p.keyIsDown(38) && this.histI < this.hist.length) {
                                        this.histI ++
                                        this.input = this.hist[this.histI - 1]
                                    } else if (this.p.keyIsDown(40)) {
                                        this.input = ''
                                        if (this.histI > 0) {
                                            this.histI --
                                            this.input = this.hist[this.histI - 1] || ''
                                        }
                                    }
                                    else if (this.input.length > 0) {
                                        if (this.p.keyIsDown(this.p.ENTER)) {
                                            if (this.p.keyIsDown(this.p.SHIFT)) {
                                                // do thing...
                                            } else {
                                                dinos.currDir = this.path
                    
                                                this.log('$ ' + this.input)
                                                this.log(dinos.cmd_run(this.input))
                    
                                                this.hist = [this.input, ...this.hist]
                                                this.histI = 0
                    
                                                this.input = ''
            
                                                this.updateMaxScrolly()
                                                this.scrolly = this.maxScrolly
                                            }
                                        } else if (this.p.keyIsDown(8)) {
                                            this.input = this.input.split('');
                                            this.input.splice(this.input.length - 1, 1);
                                            this.input = this.input.join('');
                                        }
                                        this.scrolly = this.p.constrain(this.scrolly, 0, this.maxScrolly)
                                    } 
                                },
            
                                mouseWheel: function(e) {
                                    this.updateMaxScrolly()
                                    this.scrolly = this.p.constrain(this.scrolly - e.wheelDeltaY * 0.3, 0, this.maxScrolly)
                                },
            
                                mouseReleased: function() {
                                    this.holdingScroller = false
                                },
            
                                onChange: function() {
                                    (/*set icon*/ () => {
                                        let g = p.createGraphics(50, 50);
                                        g.fill('#302');
                                        g.rect(0, 0, 50, 50, 7);
            
                                        g.translate(25, 27);
                                        // if (g.floor(g.random(10)) === 1) {
                                        //     g.rotate(g.PI / 2);
                                        // }
            
                                        g.fill(200);
                                        g.textSize(50);
                                        g.textAlign('center', 'center');
                                        g.text(':)', 0, 0);
                                        this.iconImg = g.get();
                                    })();
                                }
                            }
                        ));
                    },
                    help: 'opens terminal app in pdesk',
                    list: true
                }
            )
            dinos.cmd_run('terminal')
        }

        p.draw = function() {
            if (id === currActivity) {
                try {

                p.background('#6f0018');

                p.fill(255, 100);
                p.textSize(100);
                p.text('PDesk V0.1.3\nDinOS V0.5.2', 50, 150);

                for (let i in apps) {
                    if (i > apps.length - 2 && appActive) {apps[apps.length - 1].active();}
                    apps[i].draw();
                }

                gui.draw();

                p.fill(255);
                p.textSize(16);
                fps = p.lerp(fps, p.frameRate(), 0.1);
                p.text(fps.toFixed(3), 20, 20);

                } catch (e) {
                    console.error(e);
                }
            }
        }

        p.mousePressed = function() {
            let appNum = false;

            if (gui.mouseOverTop()) { 
                gui.onPress(); 

                appNum = gui.requestAppChange; 
            } else {
                for (let i in apps) {
                    if (apps[i].mouseOver()) {appNum = i;}
                }
            }

            if (appNum) {
                let app = apps[appNum];
                apps.splice(appNum, 1);
                apps.push(app);
                draggingApp = apps[apps.length - 1].mouseOverTop() ? true : draggingApp;
                if (draggingApp) {
                    apps[apps.length - 1].titlebarPressed();
                }
                if (apps.length > 0 && apps[apps.length-1].needToClose) {
                    draggingApp = false;
                } else if (!draggingApp && apps[apps.length - 1].mouseOver()) {
                    apps[apps.length - 1].mousePressed();
                }
            }
            memory.draggingApp = draggingApp;

            appActive = apps[apps.length - 1].mouseOver() || gui.mouseOverTop();
            memory.appActive = appActive;
        }

        p.keyPressed = function() {
            if (appActive) apps[apps.length - 1].keyPressed()
        }

        p.keyTyped = function() {
            if (appActive) apps[apps.length - 1].keyTyped()
        }

        p.keyReleased = function() {
            if (appActive) apps[apps.length - 1].keyReleased()
        }

        p.mouseDragged = function() {
            if (draggingApp) {apps[apps.length - 1].drag();} else
            if (appActive) {
                if (apps[apps.length - 1].draggingEdge() || apps[apps.length - 1].edgeBeingDragged) {
                    apps[apps.length - 1].edgeBeingDragged = true
                    apps[apps.length - 1].edgeDragged() 
                } else {
                    apps[apps.length - 1].mouseDragged()
                }
            }
        };

        p.mouseReleased = function() {
            draggingApp = false;
            memory.draggingApp = false;

            appActive = apps[apps.length - 1].mouseOver() || gui.mouseOverTop();
            memory.appActive = appActive;

            if (appActive) {
                apps[apps.length - 1].mouseReleased()
                if (apps[apps.length - 1].mouseOver()) {if(apps[apps.length - 1].mouseOverTop()) {apps[apps.length - 1].titleBarReleased();}}
            }

            for (let i in apps) {
                if (apps[i].needToClose) { 
                    for (let j in apps) {
                        apps[j].i = j;
                    }
                    apps.splice(i, 1);
                }
            }

            // if (gui.requestAppChange) {
            //     appNum = gui.requestAppChange;
            //     let app = apps[appNum];
            //     apps.splice(appNum, 1);
            //     apps.push(app);
            //     gui.requestAppChange = false;
            // }
        };

        p.mouseWheel = e => {
            for (let i = apps.length - 1; i >= 0; i --) {
                if (apps[i].mouseOver()) {
                    apps[i].mouseWheel(e)
                    break
                }
            }
        }

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }
    };
})();

environmentSetups.pdesk = (function() {
    dinos.log('pdesk setup started.');

    if (dinos.hasp5()) {
        new p5(pdesk.p5inst);
    }
});

dinos.log('pdesk.js loaded.');