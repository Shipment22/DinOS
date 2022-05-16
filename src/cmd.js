dinos.cmd_add(
    {
        name: 'help',
        fun: o => {
            if (o[0]) {
                return o[0] + ': ' + dinos.cmds[o[0]].help || 'no help text found :/'
            } else {
                for (let j in dinos.cmds) {
                    if (!dinos.cmds[j].list) { continue; }
                    return `${j}: ${dinos.cmds[j].help || 'no help text found :/'}`
                }
            }
        },
    }
)

dinos.cmd_add(
    {
        name: 'hello',
        fun: o => {
            return 'Hello!! ' + o
        },
        help: 'Returns "Hello!!" + (optional) string of text',
        list: true
    }
)
dinos.cmd_add(
    {
        name: 'hi',
        fun: o => {
            return 'Hi!! ' + o
        },
        help: 'Returns "Hi!!" + (optional) string of text',
        list: true
    }
)

dinos.cmd_add(
    {
        name: 'echo',
        fun: o => {
            for (let j of o.join(' ').split(';')) {
                return j
            }
        },
        help: 'Outputs whatever you input',
        list: true
    }
)

dinos.cmd_add(
    {
        name: 'dinos',
        fun: o => {
            return 'something goes here...'
        },
    }
)

dinos.cmd_add(
    {
        name: 'p5',
        fun: o => {
            return dinos.hasp5() ? 'p5 is loaded :)' : 'no p5 here'
        },
        help: 'outputs wether p5 exists',
        list: true
    },
)

dinos.cmd_add(
    {
        name: 'activity',
        fun: o => {
            if (o[0] === 'create') {
                if (environmentSetups[o[1]]) {
                    activitys.push(
                        {
                            name: o[1],
                            enviorment: o[1],
                        }
                    );
                    currActivity = activitys.length - 1;
                    dinos.setupActivity();
                } else {
                    return `I'm sorry, but ${o[1]} doesn't seem to exist/be loaded :\\`
                }
            } else if (o[0] === 'switch') {
                dinos.switchActivity(Number(o[1]));
                currActivity = Number(o[1]);
            }
        },
    }
)

dinos.cmd_add(
    {   
        name: 'add_package',
        fun: install,
    }
)

dinos.cmd_add({
    name: 'Link',
    fun: function() {
        return 'Link does exist.'
    },
})

dinos.cmd_add({
    name: 'rickroll',
    fun: function() {
        return dinos.rickroll
    },
})

dinos.cmd_add({
    name: ':(',
    fun: function() {
        return 'why so sad??'
    },
})

dinos.cmd_add({
    name: ':)',
    fun: function() {
        return 'happy face!!'
    },
})

dinos.cmd_add({
    name: 'fwrite',
    fun: function(o) {
        let j = `${dinos.currDir}/${o[0]}`.split('/');
        let str = '';
        for (let a of j) {
            if (a === '~') {a = 'home';}
            str += `['${a}']`;
        }
        str = `dinos.storage${str} = '${o[1]}';`;
        return str
        eval(str);
    },
})

dinos.cmd_add({
    name: 'fread',
    fun: function(o) {
        return dinos.translateDir(dinos.storage, `${dinos.currDir}/${o[0]}`)
    },
})

dinos.cmd_add({
    name: '!!CLEAR_DINOS_LOGS',
    fun: function() {
        dinos.logs = []
    }
})