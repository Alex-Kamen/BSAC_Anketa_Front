class EditDepartmentModal {
    template(param) {
        return `
            <div id="departmentEdit${param.id}" class="modal">
                <h1>Редактирование кафедры</h1>
                <div class="form">
                    ${new DepartmentForm().template(param)}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new EditDepartmentModal().methods.editDepartment(${param.id})">
                        Сохранить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        editDepartment(formId) {
            if (new Input().methods.errorMessage(`departmentName${formId}`)) return;

            new Store().modules.department.getters.editDepartment({id: formId, name: new Input().methods.getInputValue(`departmentName${formId}`)});
            new Data().methods.closeModal();
            this.reset(formId);
        },

        reset(formId) {
            new Input().methods.reset(`departmentName${formId}`);
        }
    }
}
