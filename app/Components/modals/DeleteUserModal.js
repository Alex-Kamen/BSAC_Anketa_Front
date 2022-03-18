class DeleteUserModal {
    template(param) {
        return `
            <div id="deleteUser${param.id}" class="modal">
                <h1>Вы действительно хотите удалить пользователя</h1>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new DeleteUserModal().methods.deleteUser(${param.id})">
                        Удалить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        deleteUser(formId) {
            new Store().modules.user.getters.deleteUser(formId);
            new Data().methods.closeModal();
        },
    }
}
