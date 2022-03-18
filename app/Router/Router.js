class Router {
    relocate(path) {
        try {
            history.pushState(null, null, path);
            for (const route of routes.keys()) {
                if (window.location.pathname.match(new RegExp(route))) {
                    let component = routes.get(route);
                    document.querySelector('#app').innerHTML = component.template();
                    if (component.mounted) component.mounted();
                    return;
                }
            }
        } catch(error) {
            console.log(error)
            this.relocate('/');
        }
    }
}
