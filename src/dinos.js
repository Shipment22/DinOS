var DINOS = function() {
    this.logs = [];

    this.log = function(l) {
        console.log(l);
        this.logs.push(l);
    };

    this.cmds = {
    };

    this.cmds = {};

    this.cmd_add = function(cmd) {
        this.cmds[cmd.name] = cmd;
    };

    this.cmd_run = function(code) {
        try {
            var commands = code.split(';') || code;

            // dinos.log(commands);
            for (let command of commands) {
                // dinos.log(command);
                var args = command.split(' ');
                //dinos.log(args);
                for (let argIndex in args) {
                    let arg = args[argIndex];
                    if (arg === '' || arg === ' ') {
                        args.splice(argIndex, 1);
                    }
                }
                // dinos.log(args);
                let cmd = args[0];
                args.splice(0, 1);
                if (this.cmds[cmd]) {
                    this.cmds[cmd].fun(args);
                } else {
                    dinos.log(cmd + ' is not a valid command.');
                }
            }
        }catch(e) {
            dinos.log(e);
        }
    };

    this.hasp5 = function() {
        return typeof p5 !== 'undefined';
    };

    this.setupActivity = function() {
        let activity = activitys[currActivity];
        enviormentSetups[activity.enviorment](activity);
        dinos.log('DINOS ran the setup function for your activity, "' + activity.enviorment + '" should be running now!')
        for (let i in activitys) {
            if (activity !== activitys[i]) {
                document.getElementById(activitys[i].id).style.display = 'none';
            }
        }
    };

    this.switchActivity = function(num) {
        if (typeof activitys[currActivity] !== undefined) {
            currActivity = num;
            let activity = activitys[currActivity];
            for (let i in activitys) {
                document.getElementById(activitys[i].id).style.display = 'none';
            }
            document.getElementById(activity.id).style.display = '';
        }
    };

    this.isYes = function(y) {
        let yesses = [ // well this is an interesting section of code
            'yes',
            'y',
            'yea',
            'yeah',
            'yup',
            'yep',
            'yee',
            'true',
            'yerp',
            'yipers', // not sure how to spell not even a realy word
            'yippers'
        ];

        for (let i in yesses) {
            if (yesses[i] === y) {
                return true;
            }
        }
        return false;
    };

    this.memory = {
        activitys: {},
    };

    this.currDir = '~';

    this.translateDir = function(obj, loc) {
        let j = loc.split('/');
        if (j.length > 0 && typeof obj === 'object') {
            if (j[0] === '~') { j[0] = 'home'; }
            let o = obj[j[0]];
            j.splice(0, 1);
            j = j.join('/');
            return this.translateDir(o, j);
        } else {
            return obj;
        }
    };

    this.storage = {
        home: {},
        sys: {},
    };

    this.rickroll = `We're no strangers to love
You know the rules and so do I
A full commitment's what I'm thinking of
You wouldn't get this from any other guy

I just wanna tell you how I'm feeling
Gotta make you understand

Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you

We've known each other for so long
Your heart's been aching but you're too shy to say it
Inside we both know what's been going on
We know the game and we're gonna play it

And if you ask me how I'm feeling
Don't tell me you're too blind to see

Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you

Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you

(Ooh, give you up)
(Ooh, give you up)
(Ooh) never gonna give, never gonna give (give you up)
(Ooh) never gonna give, never gonna give (give you up)

We've known each other for so long
Your heart's been aching but you're too shy to say it
Inside we both know what's been going on
We know the game and we're gonna play it

I just wanna tell you how I'm feeling
Gotta make you understand

Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you

Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you

Never gonna give you up, never gonna let you down
Never gonna run around and desert you
Never gonna make you cry, never gonna say goodbye
Never gonna tell a lie and hurt you`;
};
dinos = new DINOS();
dinos.log('Hello World!\nDINOS is up and running!');
