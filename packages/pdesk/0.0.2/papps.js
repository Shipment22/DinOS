class PApp {
    constructor(options) {
        this.p = options.p5inst;
        this.x = options.x || 200;
        this.y = options.y || 200;
        this.w = options.w || 350;
        this.h = options.h || 300;
        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;
        this.title = options.title || 'new window';

        this.titlebarH = 25;
        this.g = this.p.createGraphics(this.w, this.h - this.titlebarH);

        this.changed = true;
        this.closeButton = true;

        this.content = options.content || function() {};
        this.setup = options.setup || function() {};
        this.onChange = options.onChange || function() {};
        this.onPress = options.onPress || function() {};
        this.onRelease = options.onRelease || function() {};
        this.onDrag = options.onDrag || function() {};
        this.active = options.active || function() {};

        this.setup();
    }

    draw() {
        if (this.changed) {
            this.doIfChanged();
            this.changed = false;
        }

        this.content();
        this.p.image(this.img, this.x, this.y);
        this.p.image(this.g, this.x, this.y + this.titlebarH);
    }

    doIfChanged() {
        this.img = this.titlebar();
        this.onChange();
    }

    titlebar() {
        let p = this.p;
        let g = p.createGraphics(this.w, this.h);

        g.stroke(0);
        g.rect(0, 0, this.w, this.h);
        g.strokeWeight(user.theme.titlebar.strokeWeight);
        g.stroke(user.theme.titlebar.stroke);
        g.fill(user.theme.titlebar.fill);
        g.rect(0, 0, this.w, this.titlebarH);
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

    titlebarPressed() {
        this.mouseOffsetX = this.x - this.p.mouseX;
        this.mouseOffsetY = this.y - this.p.mouseY;
    }

    titleBarReleased() {
        if (this.closeButton && this.p.mouseX > this.x + this.w - 40) {
            this.needToClose = true;
        }
    }

    mouseOver() {
        return this.p.mouseX > this.x && this.x + this.w > this.p.mouseX && this.p.mouseY > this.y && this.y + this.h > this.p.mouseY;
    }

    mouseOverTop() {
        return this.p.mouseX > this.x && this.x + this.w > this.p.mouseX && this.p.mouseY > this.y && this.y + this.titlebarH > this.p.mouseY;
    }

    drag() {
        this.x = this.p.mouseX + this.mouseOffsetX;
        this.y = this.p.mouseY + this.mouseOffsetY;
    }
}
