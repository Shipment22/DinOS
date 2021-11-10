var PROGRAMM = `/*
Soooo evybody has kept asking me;
"Can you plsss make doggg???" 
and i'm like 
"maybe"
sooo i maketh one 😂 
but i didn't want to abandon my poor kitty fans
so dog + cat = sense 🤗
though not really cause i just got a new dog
and she terrorizes my poor kitties 😭😭
anyway idk if it looks good or not but i hope you likey, 
took a lot longer than normal.
so I added more comments than normal 😉

I wonder how many ppl didn't read that🤔 
eh whatever xD

*/


fill(255, 215, 184);
rect(0, 0, that.w, that.h - 25, 0,0,7,7);

strokeWeight(2);

var yellow = color(255, 255, 224);
var orange = color(255, 194, 148);
var grey = color(189, 179, 179);
var white = color(255, 255, 255);

function pile(x, y, s) {
    pushMatrix();
        translate(x, y);
        scale(s);
        
        //tail
        fill(yellow);
        beginShape();
            vertex(204, 124);
            bezierVertex(178, 86, 181, 124, 173, 117);
            bezierVertex(178, 240, 181, 124, 274, 201);
        endShape();
        beginShape();
            vertex(218, 148);
            bezierVertex(218, 136, 209, 116, 201, 117);
        endShape();
        //yellow dogo body ;-;
        fill(yellow);
        pushMatrix();
            translate(0, 16);
            beginShape();
                vertex(206, 175);
                bezierVertex(219, 166, 201, 155, 225, 116);
                bezierVertex(232, 103, 201, 107, 225, 62);
                bezierVertex(241, 40, 280, 45, 291, 62);
                bezierVertex(308, 110, 285, 105, 285, 116);
                bezierVertex(286, 125, 293, 137, 292, 150);
            endShape();
        popMatrix();
        //yellow dog ears
        fill(yellow);
        pushMatrix();
            translate(-5, 7);
            beginShape();
                vertex(235, 71);
                bezierVertex(229, 51, 201, 89, 207, 81);
                bezierVertex(196, 98, 201, 97, 221, 104);
                bezierVertex(231, 106, 229, 97, 230, 98);
            endShape();
        popMatrix();
        pushMatrix();
            scale(-1.0, 1.0);
            translate(-520, 7);
            beginShape();
                vertex(235, 71);
                bezierVertex(229, 51, 201, 89, 207, 81);
                bezierVertex(196, 98, 201, 97, 221, 104);
                bezierVertex(231, 106, 229, 97, 230, 98);
            endShape();
        popMatrix();
        //yellow dog tongue
        fill(255, 176, 176);
        beginShape();
            vertex(259, 115);
            bezierVertex(263, 124, 247, 124, 249, 117);
        endShape();
        line(254, 119, 254, 115);
        //yellow dog mouth
        fill(yellow);
        beginShape();
            vertex(245, 102);
            bezierVertex(228, 117, 244, 124, 248, 117);
            bezierVertex(260, 111, 260, 120, 266, 119);
            bezierVertex(275, 115, 268, 106, 264, 102);
        endShape();
        //yellow dogs nose
        line(254, 115, 254, 109);
        ellipse(254, 107, 9, 2);
        //yellow dogs eyes
        noStroke();
        fill(99, 83, 83);
        ellipse(237, 100, 8, 8);
        ellipse(272, 100, 8, 8);
        stroke(0);
        //white dog hair
        pushMatrix();
            translate(45, -110);
            fill(yellow);
            beginShape();
                vertex(201, 176);
                bezierVertex(195, 176, 189, 162, 209, 170);
                bezierVertex(216, 166, 237, 166, 223, 176);
            endShape();
        popMatrix();
        
        //grey cat tail
        fill(grey);
        beginShape();
            vertex(123, 259);
            bezierVertex(91, 235, 113, 225, 98, 220);
            bezierVertex(78, 213, 86, 196, 98, 201);
            bezierVertex(115, 207, 98, 197, 151, 244);
        endShape();
        //grey cat body
        beginShape();
            vertex(209, 171);
            bezierVertex(212, 80, 88, 114, 111, 169);
            bezierVertex(126, 192, 98, 234, 123, 259);
            vertex(258, 259);
        endShape();
        //grey cat ears
        beginShape();
            vertex(209, 164);
            bezierVertex(212, 80, 88, 114, 123, 130);
            bezierVertex(132, 136, 136, 134, 138, 125);
        endShape();
        beginShape();
            vertex(188, 119);
            bezierVertex(157, 111, 179, 140, 184, 133);
            vertex(188, 130);
        endShape();
        //grey cat paws
        beginShape();
            vertex(131, 241);
            bezierVertex(149, 266, 110, 269, 113, 235);
        endShape();
        pushMatrix();
            translate(11, -27);
            beginShape();
                vertex(131, 208);
                bezierVertex(147, 225, 133, 230, 120, 220);
            endShape();
            pushMatrix();
                translate(-4, 0);
                beginShape();
                    vertex(150, 208);
                    bezierVertex(147, 211, 137, 233, 172, 220);
                endShape();
            popMatrix();
        popMatrix();
        //grey stuff
        pushMatrix();
            translate(-175, -50);
            //grey cat eyes
            noStroke();
            fill(77, 59, 59);
            ellipse(309, 203, 8, 8);
            ellipse(340, 203, 8, 8);
            
            stroke(0);
            //grey cat mouth n'stuff
            noFill();
            pushMatrix();
                translate(0, -6);
                beginShape();
                    vertex(326, 213);
                    bezierVertex(327, 228, 317, 220, 321, 218);
                endShape();
                beginShape();
                    vertex(325, 213);
                    bezierVertex(324, 228, 335, 220, 331, 218);
                endShape();
                ellipse(325.4, 213, 7, 2);
            popMatrix();
            //grey cat whiskers
            line(302, 212, 297, 210);
            line(301, 215, 296, 215);
            line(302, 218, 297, 220);
            pushMatrix();
                scale(-1.0, 1.0);
                translate(-647,-2);
                
                line(302, 212, 297, 210);
                line(301, 215, 296, 215);
                line(302, 218, 297, 220);
            popMatrix();
        popMatrix();
        fill(255);
        //white dogs body
        fill(white);
        beginShape();
            vertex(172, 232);
            bezierVertex(153, 242, 150, 244, 152, 252);
            vertex(151, 249);
            bezierVertex(153, 259, 152, 259, 214, 259);
            bezierVertex(153, 259, 152, 259, 336, 259);
            bezierVertex(358, 259, 351, 239, 336, 220);
        endShape();
        //orange cat paws 1
        fill(orange);
        beginShape();
            vertex(351, 222);
            bezierVertex(369, 238, 346, 258, 331, 227);
        endShape();
        //orange cat body
        fill(orange);
        beginShape();
            vertex(209, 170);
            bezierVertex(246, 128, 301, 145, 330, 170);
            bezierVertex(387, 194, 352, 257, 289, 238);
            bezierVertex(239, 210, 297, 207, 224, 226);
        endShape();
        //orange cat paws 2
        fill(orange);
        beginShape();
            vertex(298, 230);
            bezierVertex(311, 253, 287, 256, 275, 234);
            bezierVertex(267, 217, 250, 220, 253, 221);
        endShape();
        //orange cat ears
        fill(orange);
        beginShape();
            vertex(293, 171);
            bezierVertex(338, 155, 358, 177, 355, 175);
            bezierVertex(357, 180, 342, 191, 338, 177);
        endShape();
        beginShape();
            vertex(281, 179);
            bezierVertex(290, 170, 301, 167, 308, 174);
            bezierVertex(317, 181, 294, 196, 294, 180);
        endShape();
        //orange cat eyes
        noStroke();
        fill(77, 59, 59);
        ellipse(309, 203, 10, 10);
        stroke(77, 59, 59);
        noFill();
        beginShape();
            vertex(345, 201);
            bezierVertex(343, 201, 338, 201, 336, 203);
        endShape();
        stroke(0);
        //orange cat mouth n'stuff
        pushMatrix();
            translate(0, -6);
            beginShape();
                vertex(326, 213);
                bezierVertex(327, 228, 317, 220, 321, 218);
            endShape();
            beginShape();
                vertex(325, 213);
                bezierVertex(324, 228, 335, 220, 331, 218);
            endShape();
            ellipse(325.4, 213, 7, 2);
        popMatrix();
        //orange cat whiskers
        line(302, 212, 297, 210);
        line(301, 215, 296, 215);
        line(302, 218, 297, 220);
        pushMatrix();
            scale(-1.0, 1.0);
            translate(-647,-2);
            
            line(302, 212, 297, 210);
            line(301, 215, 296, 215);
            line(302, 218, 297, 220);
        popMatrix();
        //white dogs head
        fill(white);
        beginShape();
            vertex(175, 193);
            bezierVertex(144, 246, 189, 259, 217, 259);
            bezierVertex(223, 259, 249, 259, 261, 225);
            bezierVertex(268, 204, 249, 183, 236, 178);
            bezierVertex(226, 173, 189, 166, 175, 193);
        endShape();
        //white dog ear 1
        fill(white);
        pushMatrix();   
            scale(0.90);
            translate(25, 23);
            beginShape();
                vertex(248, 182);
                bezierVertex(250, 161, 280, 184, 288, 200);
                bezierVertex(300, 224, 280, 227, 260, 227);
                bezierVertex(259, 227, 252, 227, 251, 216);
            endShape();
        popMatrix();
        //white dog hair
        fill(white);
        beginShape();
            vertex(201, 176);
            bezierVertex(195, 176, 189, 162, 209, 170);
            bezierVertex(216, 166, 237, 166, 223, 176);
        endShape();
        //white dog ear 2
        fill(white);
        beginShape();
            vertex(187, 181);
            bezierVertex(176, 176, 174, 167, 152, 209);
            bezierVertex(143, 229, 166, 220, 165, 221);
        endShape();
        //white dog stuff covering ear
        beginShape();
            vertex(165, 221);
            bezierVertex(165, 220, 174, 201, 171, 208);
        endShape();
        //white dogs leg 2
        fill(white);
        pushMatrix();
            translate(75, 0);
            beginShape();
                vertex(180, 236);
                bezierVertex(153, 242, 150, 244, 152, 252);
                vertex(151, 248);
                bezierVertex(153, 259, 152, 259, 210, 259);
            endShape();
        popMatrix();
        fill(white);
        //white dogs mouth
        beginShape();
            vertex(191, 212);
            bezierVertex(174, 221, 184, 233, 191, 226);
            bezierVertex(209, 221, 206, 233, 215, 226);
            bezierVertex(218, 221, 211, 212, 208, 212);
        endShape();
        //white dogs tongue
        fill(255, 166, 166);
        beginShape();
            vertex(195, 226);
            bezierVertex(185, 240, 202, 236, 203, 232);
            bezierVertex(203, 226, 210, 227, 195, 225);
        endShape();
        line(200, 225, 197, 231);
        //white dogs nose
        line(196, 224, 196, 220);
        ellipse(196, 217, 9, 2);
        //white dogs eyes
        noStroke();
        fill(77, 59, 59);
        ellipse(184, 210, 10, 10);
        ellipse(222, 210, 10, 10);
        
        stroke(0);
        fill(yellow);
        //yellow dogo paws
        beginShape();
            vertex(239, 149);
            bezierVertex(259, 143, 253, 152, 261, 148);
            bezierVertex(267, 140, 258, 130, 246, 135);
        endShape();
        beginShape();
            vertex(280, 146);
            bezierVertex(276, 143, 272, 152, 266, 146);
            bezierVertex(262, 140, 266, 130, 275, 135);
        endShape();
        //orange cat stripes
        noFill();
        stroke(204, 147, 98);
        arc(306, 203, 60, 95,-49 , -24);
        arc(301, 204, 60, 95,-42 , -20);
        arc(294, 204, 60, 95,-49 , -20);
        arc(291, 196, 121, 95,-149 , -99);
        arc(307, 200, 118, 95,-138 , -104);
        arc(316, 206, 118, 95,-142 , -96);
        
        
    popMatrix();
} 
pile(-104, 0, 1.33);

`;



function convertToPApp(txt, pjs = false) {
    txt = txt.replace(/[^.]draw = function/, 'that.content = function');
    txt = txt.replace(/function draw/, 'that.content = function');
    
    if (!pjs) {
        txt = txt.replace(/function setup/, 'let itsSetUP = true;\nthat.setup = function');
    } else {
        txt = 'that.p.angleMode(that.p.DEGREES);\n' + txt;
    }

    let fns = [
    	'whenActive',
    	'onChange',
    	'mousePressed',
    	'mouseClicked',
    	'mouseReleased',
    	'mouseDragged',
    ];
    for (let o of fns) {
    	eval('var regex = ' + '/[^.]'+o+' = function/');
	    txt = txt.replace(regex, 'that.'+o+' = function');
    	eval('regex = ' + '/[^.]function '+o+'/');
	    txt = txt.replace(regex, ' that.'+o+' = function');
    }

    let thatDotPDot = [
    	'mouseButton',
        'keyIsPressed',
        'key',
        'keyCode',
        'keyIsDown',

        'mouseIsPressed',
        'requestPointerLock',
        'exitPointerLock',

        'UP_ARROW',
        'DOWN_ARROW',
        'LEFT_ARROW',
        'RIGHT_ARROW',

        'random',
        'sin',
        'cos',
        'tan',
        'atan',
        'atan2',

        'UP',
        'DOWN',
        'LEFT',
        'RIGHT',
    ];
    for (let o of thatDotPDot) {
        let regex = '/[^.]' + o + '?![^A-Z]/g';
        eval('regex = ' + regex);

        txt = txt.replaceAll(regex, ' that.p.' + o);
    }

    txt = txt.replace(/[^.A-Z]mouseX(?! [A-Z])/g, ' that.p.mouseX - that.x');
    txt = txt.replace(/[^.A-Z]mouseY(?! [A-Z])/g, ' that.p.mouseY - that.y');
    txt = txt.replace(/[^.A-Z]pmouseX(?! [A-Z])/g, ' that.p.pmouseX - that.x');
    txt = txt.replace(/[^.A-Z]pmouseY(?! [A-Z])/g, ' that.p.pmouseY - that.y');

    let thatDotGDot = [
        /** color **/

        // creating and reading
        'alpha',
        'blue',
        'brightness',
        'color',
        'green',
        'hue',
        'lerpColor',
        'lightness',
        'red',
        'saturation',

        // settings
        'background',
        'clear',
        'colorMode',
        'fill',
        'noFill',
        'noStroke',
        'stroke',
        'erase',
        'noErase',

        /** Shape **/

        // 2D Pimatives
        'arc',
        'ellipse',
        'circle',
        'line',
        'point',
        'quad',
        'rect',
        'square',
        'triangle',

        // Attributes

        'ellipseMode?![A-Z]',
        'noSmooth',
        'rectMode',
        'smooth',
        'strokeCap?![A-Z]',
        'strokeJoin?![A-Z]',
        'strokeWeight?![A-Z]',

        // curves

        'bezier',
        'bezierDetail?![A-Z]',
        'bezierPoint?![A-Z]',
        'bezierTangent?![A-Z]',
        'curve',
        'curveDetail?![A-Z]',
        'curveTightness?![A-Z]',
        'curvePoint?![A-Z]',
        'curveTangent?![A-Z]',

        // Vertex

        'beginContour',
        'beginShape',
        'bezierVertex?![A-Z]',
        'curveVertex',
        'endContour',
        'endShape',
        'quadraticVertex',
        'vertex',
        'normal',

        /** Transforms **/
        'applyMatrix',
        'resetMatrix',
        'rotate',
        'rotateX',
        'rotateY',
        'rotateZ',
        'scale',
        'shearX',
        'shearY',
        'translate',

        //misc/other i stoped going throught the catagorys

        'push',
        'pop',
        'color?![A-Z]',
        'cos',
        'sin',
        'frameCount',
        'CLOSE',
        'text',
        'filter',
    ];
    txt = txt.replaceAll(/pushMatrix/g, 'push');
    txt = txt.replaceAll(/popMatrix/g, 'pop');
    for (let o of thatDotGDot) {
        let regex = '/[^.]' + o + '(?! [A-Z])/g';
        eval('regex = ' + regex);

        txt = txt.replaceAll(regex, '\nthat.g.' + o);
    }

    dinos.log(txt);
    return txt;
}


dinos.setupActivity();

// setTimeout(() => {
// 	dinos.cmd_run('add_package gimme');
//     setTimeout(() => {
// 		dinos.cmd_run('gimme pdesk');
// 	}, 500);
//     setTimeout(() => {
//     	dinos.cmd_run('activity create pdesk');
// 	}, 1000);
// }, 1);