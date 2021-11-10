function install(packages) {
    dinos.log('loading package(s) ' + packages + '... (hopefully)');

    for (let p of packages) {
        if (p === 'gimme') {
            // need to make github repo for gimme
            p = '';
        }
        dinos.log(p);

        let script = document.createElement('script');
        script.src = p;
        document.body.appendChild(script);
    }
}