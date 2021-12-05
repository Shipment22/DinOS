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


dinos.log('PApp converter loaded.');