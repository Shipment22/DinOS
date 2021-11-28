class PApp {
    constructor(options) {
        // the instant of p5js
        this.p = dinos.memory.activitys[currActivity || options.activity].p5inst.p;
        /* very important because 
        i didn't realise that i wouldn't be able to 
        get it through a global variable which is 
        very sad :((((((((( and now i have to figure 
        out how but i will probably have to recode a
        lot of stuff to make it work then will probably
        have to make this be even more object oriented
        to make it so that it will work which means it'll
        be harder to work on :((((((((( ;-; ;-; ;-; ;-; ;-;
        ...
        hehehe FIXED!!!! not acutually important as it was.
        */

        this.i = dinos.memory.activitys[currActivity].apps.length;

        // transforms
        this.x = options.x || 200;
        this.y = options.y || 200;
        this.w = options.w || 350;
        this.h = options.h || 300;

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
        this.changed = true;
        this.closeButton = true;

        // methods to be called
        this.content = options.content || function() {};
        this.setup = options.setup || function() {};
        this.onChange = options.onChange || function() {};
        this.onPress = options.onPress || function() {};
        this.onRelease = options.onRelease || function() {};
        this.onDrag = options.onDrag || function() {};
        this.whenActive = options.whenActive || function() {};

        // setup :)
        this.setup();
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
        this.img = this.titlebar();
        this.iconImg = this.icon();
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

    mouseOver() {
        return this.p.mouseX > this.x && this.x + this.w > this.p.mouseX && this.p.mouseY > this.y && this.y + this.h > this.p.mouseY;
    }

    mouseOverTop() {
        return this.p.mouseX > this.x && this.x + this.w > this.p.mouseX && this.p.mouseY > this.y && this.y + this.titlebarH > this.p.mouseY;
    }

    drag() {
        this.x = this.p.mouseX + this.mouseOffsetX;
        this.y = this.p.mouseY + this.mouseOffsetY;
        this.contentY = this.y + this.titlebarH;
    }
}
