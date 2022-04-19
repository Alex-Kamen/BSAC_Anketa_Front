class AddUserModal {
    template(specializationList) {
        return `
            <div class="modal" id="addUser">
                <h1>Создание пользователя</h1>
                <div class="form">
                    ${new UserForm().template({}, specializationList)}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new AddUserModal().methods.addUser()">
                        Создать
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        addUser() {
            if (this.valid()) return;

            const userData = {
                login: new Input().methods.getInputValue('userLogin'),
                password: new Input().methods.getInputValue('userPassword'),
                status: new Select().methods.getSelectValue('userStatus')
            }

            if (new Select().methods.getSelectValue(`userStatus`) === 'student') {
                userData.specialization =  +new Select().methods.getSelectValue('userSpecialization');
            }

            new Store().modules.user.getters.addUser(userData);
            new Data().methods.closeModal();
            this.reset();
        },

        valid() {
          return new Select().methods.errorMessage('userStatus')
              || new Input().methods.errorMessage('userPassword')
              || new Input().methods.errorMessage('userLogin')
              || (new Select().methods.getSelectValue(`userStatus`) === 'student' && new Select().methods.errorMessage('userSpecialization'));
        },

        reset() {
            new Input().methods.reset('userLogin');
            new Input().methods.reset('userPassword');
            new Select().methods.reset('userStatus');
            new Select().methods.getSelectValue(`userStatus`) === 'student' && new Select().methods.reset('userSpecialization');
        }
    }
}
