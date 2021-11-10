function install(packages) {
    dinos.log('loading package(s) ' + packages + '... (hopefully)');

    for (let p of packages) {
        if (p === 'gimme') {
            p = '../packages/gimme/install.js';
        }
        dinos.log(p);

        let script = document.createElement('script');
        script.src = p;
        document.body.appendChild(script);
    }
}