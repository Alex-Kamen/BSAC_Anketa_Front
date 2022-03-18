class SubHeader {
    template() {
        return `
           <div class="subheader">
                <div class="container">
                    <div class="subheader__inner">
                        <div class="subheader__item" onclick="new SubHeader().methods.relocate('/dashboard')">Главная</div>
                        <div class="subheader__item" onclick="new SubHeader().methods.relocate('/list')">Ответы</div>
                        <div class="subheader__item" onclick="new SubHeader().methods.relocate('/data')">Данные</div>
                    </div>
                </div>
            </div>
        `
    }

    methods = {
        relocate(path) {
            new Router().relocate(`${path}${window.location.search}`)
        }
    }
}
