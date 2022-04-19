class EditSpecializationModal {
    template(param, specialityList) {
        return `
            <div id="specializationEdit${param.id}" class="modal">
                <h1>Редактирование специализации</h1>
                <div class="form">
                    ${new SpecializationForm().template(param, specialityList)}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new EditSpecializationModal().methods.editSpecialization(${param.id})">
                        Сохранить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        editSpecialization(formId) {
            if (this.valid(formId)) return;

            const specializationData = {
                id: formId,
                name: new Input().methods.getInputValue(`specializationName${formId}`),
                specialityId: new Select().methods.getSelectValue(`specializationSpeciality${formId}`)
            }

            new Store().modules.specialization.getters.editSpecialization(specializationData);
            new Data().methods.closeModal();
            this.reset(formId);
        },

        valid(formId) {
            return new Input().methods.errorMessage(`specializationName${formId}`)
                || new Select().methods.errorMessage(`specializationSpeciality${formId}`);
        },

        reset(formId) {
            new Input().methods.reset(`specializationName${formId}`);
            new Select().methods.reset(`specializationSpeciality${formId}`);
        }
    }
}
