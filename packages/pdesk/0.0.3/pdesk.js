var pdesk = new (function() {
    this.p5inst = p => {
        let gui = new PizzaGui(p);
        let id = currActivity;
        let apps = [];
        let draggingApp = false;
        let fps = 0;

        p.setup = function() {
            let c = p.createCanvas(p.windowWidth, p.windowHeight);
            c.id('pdesk' + currActivity);
            activitys[currActivity].id = 'pdesk' + currActivity;

            c.elt.addEventListener("contextmenu",  e => { e.preventDefault(); });

            p.noCursor();

            apps.push(new PApp({
                p5inst: p,
                title: 'Hello!',
                x: p.width / 2 - 175,
                h: 150,
                content: function() {
                    this.g.clear();
                    this.g.text(`
Welcome to PDesk! an extension for DinOS (Dinner OS),
the "Desk" desktop, and the "P" stands for Pizza,
because Pizza is good.`, 20, 30);
                }
            }));
            apps.push(new PApp({
                p5inst: p,
                title: 'Hello!',
                x: p.width / 2 - 600,
                h: 150,
                content: function() {
                    this.g.clear();
                    this.g.text(`
Welcome to PDesk! an extension for DinOS (Dinner OS),
the "Desk" desktop, and the "P" stands for Pizza,
because Pizza is good.`, 20, 30);
                }
            }));
            apps.push(new PApp({
                p5inst: p,
                title: 'Hello!',
                x: p.width / 2 + 250,
                h: 150,
                content: function() {
                    this.g.clear();
                    this.g.text(`
Welcome to PDesk! an extension for DinOS (Dinner OS),
the "Desk" desktop, and the "P" stands for Pizza,
because Pizza is good.`, 20, 30);
                }
            }));
            gui.getAppData(apps);
        }

        p.draw = function() {
            if (id === currActivity) {
                p.background('#205');

                p.fill(255, 100);
                p.textSize(100);
                p.text('PDesk V0.0.3\nDinOS V0.4.7', 50, 150);

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
        };

        p.mouseDragged = function() {
            if (draggingApp) {apps[apps.length - 1].drag();}
        };

        p.mouseReleased = function() {
            draggingApp = false;
            for (let i in apps) {
                if (apps[i].mouseOver()) {appNum = i; apps[i].mouseOverTop() ? apps[i].titleBarReleased() :0;}
                apps[i].needToClose ? apps.splice(i, 1) :0;
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
