class AddDisciplineModal {
    template(departmentList) {
        return `
            <div class="modal" id="addDiscipline">
                <h1>Создание дисциплины</h1>
                <div class="form">
                    ${new DisciplineForm().template({}, departmentList)}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new AddDisciplineModal().methods.addDiscipline()">
                        Создать
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        addDiscipline() {
            if (this.valid()) return;

            const disciplineData = {
                name: new Input().methods.getInputValue('disciplineName'),
                department: new Select().methods.getSelectValue('disciplineDepartment')
            }

            new Store().modules.discipline.getters.addDiscipline(disciplineData);
            new Data().methods.closeModal();
            this.reset();
        },

        valid() {
            return new Select().methods.errorMessage('disciplineDepartment')
                || new Input().methods.errorMessage('disciplineName')
        },

        reset() {
            new Input().methods.reset('disciplineName');
            new Input().methods.reset('disciplineDepartment');
        }
    }
}
