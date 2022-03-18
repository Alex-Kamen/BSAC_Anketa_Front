class EditSpecialityModal {
    template(param) {
        return `
            <div id="specialityEdit${param.id}" class="modal">
                <h1>Редактирование специальности</h1>
                <div class="form">
                    ${new SpecialityForm().template(param)}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new EditSpecialityModal().methods.editSpeciality(${param.id})">
                        Сохранить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        editSpeciality(formId) {
            if (new Input().methods.errorMessage(`specialityName${formId}`)) return;

            new Store().modules.speciality.getters.editSpeciality({id: formId, name: new Input().methods.getInputValue(`specialityName${formId}`)});
            new Data().methods.closeModal();
            this.reset(formId);
        },

        reset(formId) {
            new Input().methods.reset(`specialityName${formId}`);
        }
    }
}
