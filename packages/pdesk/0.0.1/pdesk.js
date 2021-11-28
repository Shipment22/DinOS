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
                title: 'Hello, USER!',
                h: 150,
                content: function() {
                    this.g.clear();
                    this.g.text(`
Welcome to PDesk! an extension for DinOS (Dinner OS),
the "Desk" desktop, and the "P" stands for Pizza,
because Pizza is good.`, 20, 30);
                }
            }));
        }

        p.draw = function() {
            if (id === currActivity) {
                p.background(user.desktop.background);

                apps.length > 0 ? apps[apps.length - 1].active() : ':(';
                for (let i in apps) {
                    apps[i].draw();
                }

                gui.draw();

                p.fill(255);
                fps = p.lerp(fps, p.frameRate(), 0.1);
                p.text(fps.toFixed(0), 20, 20);
            }
        }

        p.mousePressed = function() {
            let appNum = false;
            for (let i in apps) {
                if (apps[i].mouseOver()) {appNum = i;}
            }
            if (appNum) {
                let app = apps[appNum];
                apps.splice(appNum, 1);
                apps.push(app);
                draggingApp = apps[apps.length - 1].mouseOverTop() ? true : draggingApp;
                if (draggingApp) {
                    apps[apps.length - 1].titlebarPressed();
                }
            }
            if (apps.length > 0 && apps[apps.length-1].needToClose) {
                apps.splice(apps.length-1, 1);
            }
        };

        p.mouseDragged = function() {
            if (draggingApp) {apps[apps.length - 1].drag();}
        };

        p.mouseReleased = function() {
            draggingApp = false;
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