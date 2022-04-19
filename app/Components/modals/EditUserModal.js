class EditUserModal {
    template(param, specializationList) {
        return `
            <div id="userEdit${param.id}" class="modal">
                <h1>Редактирование пользователя</h1>
                <div class="form">
                    ${new UserForm().template(param, specializationList)}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new EditUserModal().methods.editUser(${param.id})">
                        Сохранить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        editUser(formId) {
            if (this.valid(formId)) return;

            const userData = {
                id: formId,
                login: new Input().methods.getInputValue(`userLogin${formId}`),
                password: new Input().methods.getInputValue(`userPassword${formId}`),
                status: new Select().methods.getSelectValue(`userStatus${formId}`)
            }

            if (new Select().methods.getSelectValue(`userStatus${formId}`) === 'student') {
                userData.specialization =  +new Select().methods.getSelectValue(`userSpecialization${formId}`);
            }

            new Store().modules.user.getters.editUser(userData);
            new Data().methods.closeModal();
            this.reset(formId);
        },

        valid(formId) {
            return new Input().methods.errorMessage(`userLogin${formId}`)
                || new Select().methods.errorMessage(`userStatus${formId}`)
                || (new Select().methods.getSelectValue(`userStatus${formId}`) === 'student' && new Select().methods.errorMessage(`userSpecialization${formId}`));
        },

        reset(formId) {
            new Input().methods.reset(`userLogin${formId}`);
            new Input().methods.reset(`userPassword${formId}`);
            new Select().methods.reset(`userStatus${formId}`);
            new Select().methods.getSelectValue(`userStatus${formId}`) === 'student' && new Select().methods.reset(`userSpecialization${formId}`);
        }
    }
}
