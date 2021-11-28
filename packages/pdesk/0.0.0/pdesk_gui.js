class PizzaGui {
    constructor() {
        this.elts = [];

        // presses {
            this.clicking = false;
            this.clickTime = 0;
            this.clicking1 = false;
            this.clickTime1 = 0;
            this.dblclicking = false;
            this.dblclickTime = 0;
            this.keyTime = 0;
            this.typeing = false;
        // } presses

        // cursors {
            this.cursor = 'default';
            this.cursors = {
                default: function(p) {
                    p.strokeWeight(2);
                    p.strokeCap('round');
                    p.fill(user.colors.cursors.default);
                    // p.triangle(p.mouseX, p.mouseY, p.mouseX - 3, p.mouseY + 20, p.mouseX + 14, p.mouseY + 18);
                    p.beginShape();
                    p.curveVertex(p.mouseX, p.mouseY);
                    p.curveVertex(p.mouseX - 3, p.mouseY + 20);
                    p.curveVertex(p.mouseX + 14, p.mouseY + 18);
                    p.endShape('close');
                },
            };
        // } cursors
    }

    handlePresses(p) {
        this.thingSelected = false;
        if (!p.mouseIsPressed) {
            this.clickTime++;
            this.dblclickTime ++;
            if (this.clickTime === 1) {
                if (this.dblclickTime < 15) {
                    this.dblclicking = true;
                } else {
                    this.dblclicking = false;
                }
                this.dblclickTime = 0;
                this.clicking = true;
            } else {
                this.clicking = false;
                this.dblclicking = false;
            }
        } else {
            this.clickTime = 0;
            this.clicking = false;
            this.dblclicking = false;
        }
        
        if (p.mouseIsPressed) {
            this.clickTime1++;
            if (this.clickTime1 === 1) {
                this.clicking1 = true;
            } else {this.clicking1 = false;}
        } else {
            this.clickTime1 = 0;
            this.clicking1 = false;
        }
        
        if (p.keyIsPressed) {
            this.keyTime++;
            if (this.keyTime === 1) {
                this.typeing = true;
            } else {this.typeing = false;}
        } else {
            this.keyTime = 0;
        }
    }

    map(n, p) {
        if (typeof n === 'string') {
            let s;
            let h = false;
            if (n.search('w') > 0) {
                s = n.split('w')[0];
            } else {
                s = n.split('h')[0];
                h = true;
            }
            n = p.map(s, 0, 100, 0, h ? p.height : p.width);
        }

        return n;
    }

    drawCursor(p) {
        this.cursors[this.cursor](p);
    };

    draw(p) {
        this.handlePresses(p);
        this.drawCursor(p);
    }
}

class PizzaElt {
    constructor(o) {
        this.pos = new p5.Vector(o.x, o.y);
        this.w = o.x;
        this.h = o.h;
        this.hidden = o.hidden || false;
        this.type = o.type || 'text';
    }
}