(function() {
	let pdeskgui = document.createElement('script');
	pdeskgui.src = './packages/pdesk/0.1.2/pgui.js';
	document.body.appendChild(pdeskgui);
	let papps = document.createElement('script');
	papps.src = './packages/pdesk/0.1.2/papps.js';
	document.body.appendChild(papps);
	let pdesk = document.createElement('script');
	pdesk.src = './packages/pdesk/0.1.2/pdesk.js';
	document.body.appendChild(pdesk);
})();