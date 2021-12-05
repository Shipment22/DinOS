const gimmes = {
	pdesk: './packages/pdesk/install.js',
	PAppConverter: './packages/PAppConverter/install.js'
};

dinos.cmd_add(
	{
		name: 'gimme',
		fun: function(packages) {
			for (let p of packages) {
				if (typeof gimmes[p] !== undefined) {
					dinos.cmd_run('add_package ' + gimmes[p]);
				} else {
					dinos.cmd_run('add_package ' + p);
				}
			}
		}
	}
);
dinos.log('gimme.js loaded :)');