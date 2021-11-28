class PizzaGui {
    constructor(p) {
        this.g = p;

        this.dockRound = 8;
        this.dockWidth = 400;
        this.dockHeight = 50;
        this.dockX = window.innerWidth / 2 - this.dockWidth / 2;
        this.dockY = window.innerHeight - (this.dockHeight + 8);

        this.gg = this.g.createGraphics(600, 600);

        // create cursor image
        this.gg.background(0, 0);
        this.gg.push();
        this.gg.translate(4, 0);
        this.gg.stroke(0);
        this.gg.strokeWeight(2);
        this.gg.strokeCap('round');
        this.gg.fill(user.theme.cursors.default);
        this.gg.beginShape();
        this.gg.curveVertex(0, 0);
        this.gg.curveVertex(0 - 3, 0 + 20);
        this.gg.curveVertex(0 + 14, 0 + 18);
        this.gg.endShape('close');
        this.gg.pop();
        this.cursor_default = this.gg.get(0, 0, 25, 35);

        // create "dashboard"/"launchpad" icon
        this.gg.clear();
        this.gg.push();
        this.gg.fill(255, 50);
        this.gg.noStroke();
        this.gg.translate(6, 6);
        for (let y = 0; y < 3; y ++) {
            for (let x = 0; x < 3; x ++) {
                this.gg.rect(x * 13, y * 13, 9, 9, this.g.random(2, 8), this.g.random(2, 8), this.g.random(2, 8), this.g.random(2, 8));
            }
        }
        this.gg.pop();
        this.menuImg = this.gg.get(0, 0, 50, 50);
    }

    drawDock() {
        // background
        this.g.noStroke();
        this.g.fill(0, 50);
        this.g.rect(this.dockX, this.dockY, this.dockWidth, this.dockHeight, this.dockRound);

        // apps menu
        this.g.image(this.menuImg, this.dockX, this.dockY, this.dockHeight, this.dockHeight);
    }

    drawCursor() {
        this.g.image(this.cursor_default, this.g.mouseX - 5, this.g.mouseY);
    }

    draw() {
        this.drawDock();
        this.drawCursor();
    }
}