class Header {
    template() {
        return `
           <div class="header">
                <div class="container">
                    <div class="header__inner">
                        <div class="header__item">
                            <img src="http://anketaback.vfbsac.by/static/img/bsac_logo.svg" alt="bsac_logo" class="header__logo">
                            <p class="header__title">Анкетирование</p>
                        </div>
                        <div onclick="new Header().methods.logout()" class="header__logout">Выйти</div>
                    </div>
                </div>
            </div>
        `
    }

    methods = {
        logout() {
            new Router().relocate('/');
        }
    }
}
