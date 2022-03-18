class AddDepartmentModal {
    template() {
        return `
            <div class="modal" id="addDepartment">
                <h1>Создание кафедры</h1>
                <div class="form">
                    ${new DepartmentForm().template()}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new AddDepartmentModal().methods.addDepartment()">
                        Создать
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        addDepartment() {
            if (new Input().methods.errorMessage('departmentName')) return;

            new Store().modules.department.getters.addDepartment(new Input().methods.getInputValue('departmentName'));
            new Data().methods.closeModal();
            this.reset();
        },

        reset() {
            new Input().methods.reset('departmentName');
        }
    }
}
