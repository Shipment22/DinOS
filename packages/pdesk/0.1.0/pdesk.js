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

        memory.draggingApp = false
        let draggingApp = memory.draggingApp;
        let fps = 0;

        p.setup = function() {
            let c = p.createCanvas(p.windowWidth, p.windowHeight);
            c.id('pdesk' + currActivity);
            activitys[currActivity].id = 'pdesk' + currActivity;

            c.elt.addEventListener("contextmenu",  e => { e.preventDefault(); });

            p.noCursor();

            apps.push(new PApp({
                title: 'Hello!',
                x: p.width / 2 - 175,
                h: 150,
                onChange: function() {
                    this.g.clear();
                    this.g.text(`
Welcome to PDesk! an extension for DinOS (Dinner OS),
the "Desk" desktop, and the "P" stands for Pizza,
because Pizza is good.`, 20, 30);

                    (/*set icon*/ () => {
                        let g = p.createGraphics(50, 50);
                        g.fill(0);
                        g.rect(0, 0, 50, 50, 7);
                        g.textSize(10);
                        let t = 'Welcome!';
                        let ca = ['#f00', '#eb0', '#ff0', '#0f0', '#55f', '#a0a'];
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
            }));
            apps.push(new PApp({
                title: 'Hello!',
                x: p.width / 2 - 600,
                h: 150,
                onChange: function() {
                    this.g.clear();
                    this.g.text(`
Welcome to PDesk! an extension for DinOS (Dinner OS),
the "Desk" desktop, and the "P" stands for Pizza,
because Pizza is good.`, 20, 30);

                    (/*set icon*/ () => {
                        let g = p.createGraphics(50, 50);
                        g.fill(0);
                        g.rect(0, 0, 50, 50, 7);
                        g.textSize(10);
                        let t = 'Welcome!';
                        let ca = ['#f00', '#eb0', '#ff0', '#0f0', '#55f', '#a0a'];
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
            }));
            apps.push(new PApp({
                title: 'Hello!',
                x: p.width / 2 + 250,
                h: 150,
                onChange: function() {
                    this.g.clear();
                    this.g.text(`
Welcome to PDesk! an extension for DinOS (Dinner OS),
the "Desk" desktop, and the "P" stands for Pizza,
because Pizza is good.`, 20, 30);

                    (/*set icon*/ () => {
                        let g = p.createGraphics(50, 50);
                        g.fill(0);
                        g.rect(0, 0, 50, 50, 7);
                        g.textSize(10);
                        let t = 'Welcome!';
                        let ca = ['#f00', '#eb0', '#ff0', '#0f0', '#55f', '#a0a'];
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
                }
            }));
            gui.getAppData(apps);
        }

        p.draw = function() {
            if (id === currActivity) {
                p.background('#6f0018');

                p.fill(255, 100);
                p.textSize(100);
                p.text('PDesk V0.1.0\nDinOS V0.5.0', 50, 150);

                for (let i in apps) {
                    i > apps.length - 2 ? apps[apps.length - 1].active() : ':(';
                    apps[i].draw();
                }

                gui.draw();

                p.fill(255);
                p.textSize(16);
                fps = p.lerp(fps, p.frameRate(), 0.1);
                p.text(fps.toFixed(3), 20, 20);
            }
        }

        p.mousePressed = function() {
            let appNum = false;

            if (gui.mouseOverTop()) { gui.onPress(); appNum = gui.requestAppChange; } else {
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
                }
            }
            memory.draggingApp = draggingApp;
        };

        p.mouseDragged = function() {
            if (draggingApp) {apps[apps.length - 1].drag();}
        };

        p.mouseReleased = function() {
            draggingApp = false;
            memory.draggingApp = false;

            for (let i in apps) {
                if (apps[i].mouseOver()) {appNum = i; apps[i].mouseOverTop() ? apps[i].titleBarReleased() :0;}
                if (apps[i].needToClose) { 
                    apps.splice(i, 1);
                    for (let o of apps) {
                        o.i --;
                    }
                }
            }

            // if (gui.requestAppChange) {
            //     appNum = gui.requestAppChange;
            //     let app = apps[appNum];
            //     apps.splice(appNum, 1);
            //     apps.push(app);
            //     gui.requestAppChange = false;
            // }
            gui.getAppData(apps);
        };

        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        }
    };
})();

enviormentSetups.pdesk = (function() {
    dinos.log('pdesk setup started.');

    if (dinos.hasp5()) {
        new p5(pdesk.p5inst);
    }
});
