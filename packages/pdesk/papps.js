class PApp {
    constructor(options) {
        // the instance of p5js
        this.p = dinos.memory.activitys[currActivity || options.activity].p5inst.p;
        
        // the index of this window
        this.i = dinos.memory.activitys[currActivity].apps.length;

        // transforms
        this.x = options.x || 200;
        this.y = options.y || 200;
        this.w = options.w || 350;
        this.h = options.h + 25 || 300;
        this.minW = options.minW || 70;
        this.minH = options.minH + 25 || 50;

        // mouse offsets for when dragging
        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;

        // some random titlebar stuff
        this.title = options.title || 'new window';
        this.titlebarH = 25;

        // some variables that have to do with content
        this.contentY = this.y + this.titlebarH;
        this.g = this.p.createGraphics(this.w, this.h - this.titlebarH);

        // idk
        this.changed = true
        this.closeButton = true
        this.edgeBeingDragged = false
        this.ableToDragEdge = true

        // methods to be called
        this.content = options.draw || options.content || function() {};
        this.setup = options.setup || function() {};
        this.onChange = options.onChange || function() {};
        this.mousePressed = options.mousePressed || function() {};
        this.mouseReleased = options.mouseReleased || function() {};
        this.mouseDragged = options.mouseDragged || function() {};
        this.keyPressed = options.keyPressed || function() {};
        this.keyTyped = options.keyTyped || function() {};
        this.keyReleased = options.keyReleased || function() {};
        this.whenActive = options.whenActive || function() {};
        this.mouseWheel = options.mouseWheel || function() {};

        this.logs = []

        // setup :)
        this.setup();
    }

    log(l) {
        if (typeof l === 'Object') {
            for (o of l) {
                this.logs.push(o)
            }
        } else this.logs.push(l)
    }

    draw() {
        if (this.changed) {
            this.doIfChanged();
            this.changed = false;
        }

        this.content();
        this.p.image(this.img, this.x, this.y);
        this.p.image(this.g, this.x, this.contentY);
    }

    active() {
        this.whenActive();

        this.p.fill(0, 100);
        this.p.rect(this.x - 10, this.y - 10, this.w + 20, this.h + 20, 7);
        
    }

    doIfChanged() {
        this.img = this.titlebar()
        this.iconImg = this.icon()
        let g = this.g.get()
        this.g = this.p.createGraphics(this.w, this.h - this.titlebarH)
        this.g.image(g, 0, 0)
        this.onChange();
    }

    titlebar() {
        let p = this.p;
        let g = p.createGraphics(this.w, this.h);

        g.stroke(0);
        g.rect(0, 0, this.w, this.h, 7);
        g.strokeWeight(3);
        g.stroke('#006d00');
        g.fill('green');
        g.rect(0, 0, this.w, this.titlebarH, 10,10,3,3);
        g.fill(0, 20);
        g.noStroke();
        g.ellipse(this.w * .15, this.titlebarH / 2, this.w * .5, this.titlebarH * 1.2);
        g.ellipse(this.w * .15, this.titlebarH / 2, this.w * .4, this.titlebarH * 1.1);
        g.fill(0, 15);
        g.ellipse(this.w * .95, this.titlebarH / 2, this.w * .4, this.titlebarH);
        g.ellipse(this.w * .95, this.titlebarH / 2, this.w * .3, this.titlebarH * .8);
        g.fill(255);
        g.stroke(0);
        g.strokeWeight(1);
        g.text(this.title, 7, 15);
        if (this.closeButton){
            g.fill(255, 0, 0);
            g.text('close', this.w - (g.textWidth('close') + 7), 15);
        }

        return g.get();
    }

    icon() {
        let p = this.p;
        let g = p.createGraphics(50, 50);

        g.fill(p.random(255));
        g.rect(0, 0, 50, 50, 7);

        return g.get();
    }

    titlebarPressed() {
        this.mouseOffsetX = this.x - this.p.mouseX;
        this.mouseOffsetY = this.y - this.p.mouseY;
    }

    titleBarReleased() {
        if (this.closeButton && this.p.mouseX > this.x + this.w - 40) {
            this.needToClose = true;
        }
    }

    draggingEdge() {
        return this.mouseOver() && (this.p.mouseX < this.x + 5 || this.x + this.w < this.p.mouseX + 5 || this.p.mouseY < this.y + 5 || this.y + this.h < this.p.mouseY + 5)
    }

    edgeDragged() {
        if (!this.p.mouseIsPressed || !this.ableToDragEdge) {
            this.edgeBeingDragged = false
            this.ableToDragEdge = true
            return
        }

        let x = this.x, y = this.y, w = this.w, h = this.h
        let movedX = this.p.mouseX - this.p.pmouseX, movedY = this.p.mouseY - this.p.pmouseY

        if (this.p.mouseX < x + w / 2) {
            x = x + movedX
            w = this.p.max(w - movedX, this.minW)
        } else {
            w = this.p.max(w + movedX, this.minW)
        }
        if (!this.p.mouseY < y + 6) h = this.p.max(h + movedY, this.minH)

        this.transform({
            x: x,
            y: y,
            w: w,
            h: h
        })
    }

    mouseOver() {
        return this.p.mouseX > this.x && this.x + this.w > this.p.mouseX && this.p.mouseY > this.y && this.y + this.h > this.p.mouseY
    }

    mouseOverTop() {
        return this.p.mouseX > this.x && this.x + this.w > this.p.mouseX && this.p.mouseY > this.y && this.y + this.titlebarH > this.p.mouseY;
    }

    drag() {
        this.x = this.p.mouseX + this.mouseOffsetX;
        this.y = this.p.mouseY + this.mouseOffsetY;
        this.contentY = this.y + this.titlebarH;
    }

    transform(o) {
        if (o.w) this.w = o.w
        if (o.h) this.h = o.h
        if (o.x) this.x = o.x
        if (o.y) this.y = o.y
        this.doIfChanged()
    }
}

dinos.log('papps.js loaded.');