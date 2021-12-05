(function() {
	let pdeskgui = document.createElement('script');
	pdeskgui.src = './packages/pdesk/pgui.js';
	document.body.appendChild(pdeskgui);
	let papps = document.createElement('script');
	papps.src = './packages/pdesk/papps.js';
	document.body.appendChild(papps);
	let pdesk = document.createElement('script');
	pdesk.src = './packages/pdesk/pdesk.js';
	document.body.appendChild(pdesk);
})();