class App {
	init() {
		try {
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
			new Router().relocate('/');
		}
	}
}

let storedHash = window.location.pathname;

setInterval(() => {
	if (window.location.pathname !== storedHash) {
		storedHash = window.location.pathname
		new App().init();
	}
}, 100);

new App().init();





