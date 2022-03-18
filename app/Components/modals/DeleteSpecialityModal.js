class DeleteSpecialityModal {
    template(param) {
        return `
            <div id="deleteSpeciality${param.id}" class="modal">
                <h1>Вы действительно хотите удалить специальность</h1>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new DeleteSpecialityModal().methods.deleteSpeciality(${param.id})">
                        Удалить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        deleteSpeciality(formId) {
            new Store().modules.speciality.getters.deleteSpeciality(formId);
            new Data().methods.closeModal();
        },
    }
}
