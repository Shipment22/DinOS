var pdesk = new (function() {
    this.p5inst = p => {
        let gui = new PizzaGui();

        p.setup = function() {
            let c = p.createCanvas(p.windowWidth, p.windowHeight);
            c.id('pdesk' + currActivity);
            activitys[currActivity].id = 'pdesk' + currActivity;

            c.elt.addEventListener("contextmenu",  e => { e.preventDefault(); });

            p.noCursor();

            
        }

        p.draw = function() {
            p.background(user.colors.login.background);

            p.line(p.width / 2, 0, p.width / 2, p.height);
            p.line(0, p.height / 2, p.width, p.height / 2);

            gui.draw(p);

            p.text([p.frameRate(), gui.clicking, gui.clicking1, gui.dblclicking, gui.typeing].join('\n'), 20, 20);
        }

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
