class DeleteDisciplineModal {
    template(param) {
        return `
            <div id="deleteDiscipline${param.id}" class="modal">
                <h1>Вы действительно хотите удалить дисциплину</h1>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new DeleteDisciplineModal().methods.deleteDiscipline(${param.id})">
                        Удалить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        deleteDiscipline(formId) {
            new Store().modules.discipline.getters.deleteDiscipline(formId);
            new Data().methods.closeModal();
        },
    }
}
