class DeleteDepartmentModal {
    template(param) {
        return `
            <div id="deleteDepartment${param.id}" class="modal">
                <h1>Вы действительно хотите удалить кафедру</h1>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new DeleteDepartmentModal().methods.deleteDepartment(${param.id})">
                        Удалить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        deleteDepartment(formId) {
            new Store().modules.department.getters.deleteDepartment(formId);
            new Data().methods.closeModal();
        },
    }
}
