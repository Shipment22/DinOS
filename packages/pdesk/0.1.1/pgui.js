class PizzaGui {
    constructor(p) {
        this.p = p;

        // dock settings
            this.dockRound = 8;
            this.dockWidth = 400;
            this.dockHeight = 50;
            this.dockX = window.innerWidth / 2 - this.dockWidth / 2;
            this.dockY = window.innerHeight - (this.dockHeight + 8);

        this.launchpadOpen = false;// true when launchpad is open

        // creates a "virtual canvas" for drawing images(icons mostly) on
            this.g = this.p.createGraphics(600, 600);
            // :)

        // creates cursor image
            this.g.background(0, 0);
            this.g.push();
            this.g.translate(4, 0);
            this.g.stroke(0);
            this.g.strokeWeight(2);
            this.g.strokeCap('round');
            this.g.fill(user.theme.cursors.default);
            this.g.beginShape();
            this.g.curveVertex(0, 0);
            this.g.curveVertex(0 - 3, 0 + 20);
            this.g.curveVertex(0 + 14, 0 + 18);
            this.g.endShape('close');
            this.g.pop();
            this.cursor_default = this.g.get(0, 0, 25, 35);

        // creates launchpad icon
            this.g.clear();
            this.g.push();
            this.g.fill(255, 150);
            this.g.noStroke();
            this.g.translate(6, 6);
            for (let y = 0; y < 3; y ++) {
                for (let x = 0; x < 3; x ++) {
                    this.g.rect(x * 13, y * 13, 9, 9, this.g.random(2, 8), this.g.random(2, 8), this.g.random(2, 8), this.g.random(2, 8));
                }
            }
            this.g.pop();
            this.launchpadIcon = this.g.get(0, 0, 50, 50);

        // app stuff
            this.appData = [];
            this.requestAppChange = false;
    }
   
    draw() { // draw everything for PizzaGui (or almost everything)
        this.launchpadOpen ? this.drawLaunchpad() :0;
        this.drawDock();
        this.drawCursor();
    }

    drawCursor() { // NOTE: make cursor changable though user settings
        this.p.image(this.cursor_default, this.p.mouseX - 5, this.p.mouseY);
    }

    tooltip(txt, h = 20) {
        this.p.textSize(h);
        let x = this.p.mouseX + 17, y = this.p.mouseY - 2;
        let w = this.p.textWidth(txt);
        if (x + w > this.p.width) {
            x -= w + 26;
        }

        this.p.fill(255, 200);
        this.p.rect(x, y, w, h, 2);
        this.p.fill(0, 200);
        this.p.text(txt, x, y + h - 2);
    }

    drawDock() { // draws dock (currently usless)
        // background
        this.p.noStroke();
        this.p.fill(0, 50);
        this.p.rect(this.dockX, this.dockY, this.dockWidth, this.dockHeight, this.dockRound);

        // apps menu
        this.p.image(this.launchpadIcon, this.dockX, this.dockY, this.dockHeight, this.dockHeight);
    
        // currently open applications
        this.p.fill('#0e07');
        let a = dinos.memory.activitys[currActivity].apps;
        if (a.length > 0) {
            if(dinos.memory.activitys[currActivity].appActive) {this.p.rect(this.dockX + this.dockHeight + this.dockHeight * a[a.length - 1].i - 3, this.dockY, this.dockHeight, this.dockHeight, 7);}
            for (let o of a) {
                this.p.image(o.iconImg, this.dockX + this.dockHeight + this.dockHeight * o.i, this.dockY + 3, this.dockHeight - 6, this.dockHeight - 6);
            }
        }

        if (this.mouseIsOver(this.dockX, this.dockY, this.dockWidth, this.dockHeight)) {
            for (let i in dinos.memory.activitys[currActivity].apps) {
                let o = dinos.memory.activitys[currActivity].apps[i];
                if (this.mouseIsOver(this.dockX + this.dockHeight + this.dockHeight * o.i, this.dockY + 3, this.dockHeight - 6, this.dockHeight - 6)) {
                   // tooltip thing
                   this.tooltip(o.title);
                }
            }
        }
    }

    drawLaunchpad() { // draws the "launchpad" when its open
        this.p.background(0, 75);
    }

    mouseOverTop() { // returns true when one or more top layer items is mouseovered
        return this.mouseIsOver(this.dockX, this.dockY, this.dockWidth, this.dockHeight) || this.launchpadOpen;
    }

    onPress() { // triggered by the p5js mousePressed funtion when conditions are meant
        // dock
        if (this.mouseIsOver(this.dockX, this.dockY, this.dockWidth, this.dockHeight)) {
            this.dockPress();
        }
    }
    
    dockPress() {
        this.launchpadOpen = this.mouseIsOver(this.dockX, this.dockY, this.dockHeight, this.dockHeight) ? !this.launchpadOpen : false;
        this.requestAppChange = false;
        
        for (let i in dinos.memory.activitys[currActivity].apps) {
            let o = dinos.memory.activitys[currActivity].apps[i];
            if (this.mouseIsOver(this.dockX + this.dockHeight + this.dockHeight * o.i, this.dockY + 3, this.dockHeight - 6, this.dockHeight - 6)) {
                this.requestAppChange = i;
            }
        }
    }

    mouseIsOver(x, y, w, h) { // returns wether the mouse is over a rectangle area
        return this.p.mouseX > x && this.p.mouseY > y && this.p.mouseX < x + w && this.p.mouseY < y + h;
    }

    getAppData(apps) {
        this.appData = [];
        for (let o of apps) {
            this.appData.push({
                title: o.title,
                icon: o.icon || false,

            });
        }
    }
}