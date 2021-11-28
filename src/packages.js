function install(packages) {
    dinos.log('loading package(s) \'' + packages + '\'... (hopefully)');

    for (let p of packages) {
        let script = document.createElement('script');
        script.src = p;
        document.body.appendChild(script);
    }
}

install(['/DinOS/packages/gimme/install.js']);