class DeleteSpecializationModal {
    template(param) {
        return `
            <div id="deleteSpecialization${param.id}" class="modal">
                <h1>Вы действительно хотите удалить специализацию</h1>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new DeleteSpecializationModal().methods.deleteSpecialization(${param.id})">
                        Удалить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        deleteSpecialization(formId) {
            new Store().modules.specialization.getters.deleteSpecialization(formId);
            new Data().methods.closeModal();
        },
    }
}
