class Auth {
    template() {
        return `
        <div class="login">
            <div class="container">
                <div class="login__inner">
                    <div class="login__form">
                        <div class="login__header">
                            <img src="http://anketaback.vfbsac.by/static/img/bsac_logo.svg" alt="bsac_logo" class="logo">
                            <h1 class="login__title">Анкетирование</h1>
                        </div>
                        <div class="input__form">
                            <div>
                                <div class="input">
                                    <input type="text" name="login" placeholder="Введите логин" oninput="new Auth().methods.errorLoginMessage()">
                                    <p class="error errorLogin"></p>
                                </div>
                                <div class="input">
                                    <input type="password" name="password" placeholder="Введите пароль" oninput="new Auth().methods.errorPasswordMessage()">
                                    <p class="error errorPassword"></p>
                                </div>
                                <div class="input">
                                    <button name="submit" onclick="new Auth().methods.auth()">Войти</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    methods = {
        login() {
            return document.querySelector('input[name="login"]').value;
        },

        password() {
            return document.querySelector('input[name="password"]').value;
        },

        auth() {
            this.errorMessage();

            if (!this.validate()) {
                return;
            }

            new Store().modules.user.getters.auth(this.login(), this.password()).then((response) => {
                if (response.status) {
                    localStorage.setItem('session', JSON.stringify(response));

                    if (response.status === 'admin') {
                        new Router().relocate('/dashboard');
                        return;
                    }

                    if (response.status === 'departmentManager') {
                        new Router().relocate(`/dashboard?department=${response.departmentId}`);
                        return;
                    }

                    new Router().relocate('/formList');
                } else {
                    document.querySelector('.errorLogin').innerHTML = 'Неверные данные для входа';
                    document.querySelector('.errorPassword').innerHTML = 'Неверные данные для входа';
                }
            });
        },

        validate() {
            return this.validateLogin() && this.validatePassword();
        },

        validateLogin() {
            return this.login();
        },

        validatePassword() {
            return this.password();
        },

        errorMessage() {
            this.errorLoginMessage();
            this.errorPasswordMessage();
        },

        errorLoginMessage() {
            if (!this.validateLogin()) {
                document.querySelector('.errorLogin').innerHTML = 'Поле обязательно для заполнения';
            } else {
                document.querySelector('.errorLogin').innerHTML = '';
            }
        },

        errorPasswordMessage() {
            if (!this.validatePassword()) {
                document.querySelector('.errorPassword').innerHTML = 'Поле обязательно для заполнения';
            } else {
                document.querySelector('.errorPassword').innerHTML = '';
            }
        },
    }
}
