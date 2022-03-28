dinos.setupActivity();

setTimeout(() => {
	dinos.cmd_run('gimme pdesk');
    setTimeout(() => {
    	dinos.cmd_run('activity create pdesk');
	}, 700);
}, 1)