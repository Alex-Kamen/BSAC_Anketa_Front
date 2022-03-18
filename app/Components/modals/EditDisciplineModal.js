class EditDisciplineModal {
    template(param, departmentList) {
        return `
            <div id="disciplineEdit${param.id}" class="modal">
                <h1>Редактирование дисциплины</h1>
                <div class="form">
                    ${new DisciplineForm().template(param, departmentList)}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new EditDisciplineModal().methods.editDiscipline(${param.id})">
                        Сохранить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        editDiscipline(formId) {
            if (this.valid()) return;

            const disciplineData = {
                id: formId,
                name: new Input().methods.getInputValue(`disciplineName${formId}`),
                department: new Select().methods.getSelectValue(`disciplineDepartment${formId}`)
            }

            new Store().modules.discipline.getters.editDiscipline(disciplineData);
            new Data().methods.closeModal();
            this.reset(formId);
        },

        valid(formId) {
            return new Input().methods.errorMessage(`disciplineName${formId}`)
                || new Select().methods.errorMessage(`disciplineDepartment${formId}`);
        },

        reset(formId) {
            new Input().methods.reset(`disciplineName${formId}`);
            new Select().methods.reset(`disciplineDepartment${formId}`);
        }
    }
}
