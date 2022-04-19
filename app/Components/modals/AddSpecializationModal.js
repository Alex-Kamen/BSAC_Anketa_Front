class AddSpecializationModal {
    template(specialityList) {
        return `
            <div class="modal" id="addSpecializationModal">
                <h1>Создание специализации</h1>
                <div class="form">
                    ${new SpecializationForm().template({}, specialityList)}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new AddSpecializationModal().methods.addSpecialization()">
                        Создать
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        addSpecialization() {
            if (this.valid()) return;

            const specializationData = {
                name: new Input().methods.getInputValue('specializationName'),
                specialityId: new Select().methods.getSelectValue('specializationSpeciality')
            }

            new Store().modules.specialization.getters.addSpecialization(specializationData);
            new Data().methods.closeModal();
            this.reset();
        },

        valid() {
            return new Select().methods.errorMessage('specializationSpeciality')
                || new Input().methods.errorMessage('specializationName')
        },

        reset() {
            new Input().methods.reset('specializationName');
            new Input().methods.reset('specializationSpeciality');
        }
    }
}
