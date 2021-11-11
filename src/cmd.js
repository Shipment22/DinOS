dinos.cmd_add(
    {
        name: 'help',
        fun: o => {
            let helpObj = {
                echo: 'returns the parameters',
                hello: 'ruturns Hello!! + (optional) string of text',
                hi: 'ruturns Hello!! + (optional) string of text',
                dinos: 'returns DinOS (Dinner OS)',
                p5: 'tells you weather p5js has been loaded',
                activity: 'parameters: [method (create, switch)] [number(activity to switch to)/string(activity to create)]',
                add_package: 'parameter: [url(s) of package(s)]',
            };
            let helpArr = [
                'echo',
                'hello',
                'hi',
                'dinos',
                'p5',
                'activity',
                'add_package',
            ];
            if (o[0]) {
                dinos.log(o[0] + ': ' + helpObj[o[0]]);
            } else {
                for (let i in helpArr) {
                    dinos.log(helpArr[i] + ': ' + helpObj[helpArr[i]]);
                }
            }
        },
    }
);


dinos.cmd_add(
    {
        name: 'hello',
        fun: o => {
            dinos.log('Hello!! ' + o);
        },
    }
);
dinos.cmd_add(
    {
        name: 'hi',
        fun: o => {
            dinos.log('Hello!! ' + o);
        },
    }
);
dinos.cmd_add(
    {
        name: 'echo',
        fun: o => {
            for (let j of o.join(' ').split(';')) {
                dinos.log(j);
            }
        },
    }
);
dinos.cmd_add(
    {
        name: 'dinos',
        fun: o => {
            dinos.log('DinOS (Dinner OS)');
        },
    }
);
dinos.cmd_add(
    {
        name: 'p5',
        fun: o => {
            dinos.log(dinos.hasp5());
        },
    }
);
dinos.cmd_add(
    {
        name: 'activity',
        fun: o => {
            if (o[0] === 'create') {
                if (enviormentSetups[o[1]]) {
                    activitys.push(
                        {
                            name: o[1],
                            enviorment: o[1],
                        }
                    );
                    currActivity = activitys.length - 1;
                    dinos.setupActivity();
                } else {
                    dinos.log('I\'m sorry but that activity does not exist :( maybe you spelled wrong or didn\'t load it.')
                }
            } else if (o[0] === 'switch') {
                dinos.switchActivity(Number(o[1]));
                currActivity = Number(o[1]);
            }
        },
    }
);

dinos.cmd_add(
    {   
        name: 'add_package',
        fun: install,
    }
);

dinos.cmd_add({
    name: 'Link',
    fun: function() {
        dinos.log('Link does exist.');
    },
});

dinos.cmd_add({
    name: 'rickroll',
    fun: function() {
        dinos.log(dinos.rickroll);
    },
});

dinos.cmd_add({
    name: ':(',
    fun: function() {
        dinos.log('why so sad??');
    },
});
