class AddSpecialityModal {
    template() {
        return `
            <div class="modal" id="addSpeciality">
                <h1>Создание Специальности</h1>
                <div class="form">
                    ${new SpecialityForm().template()}
                </div>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new AddSpecialityModal().methods.addSpeciality()">
                        Создать
                    </div>
                </div>
            </div>
        `
    }

    methods = {
        addSpeciality() {
            if (new Input().methods.errorMessage('specialityName')) return;

            new Store().modules.speciality.getters.addSpeciality(new Input().methods.getInputValue('specialityName'));
            new Data().methods.closeModal();
            this.reset();
        },

        reset() {
            new Input().methods.reset('specialityName');
        }
    }
}
