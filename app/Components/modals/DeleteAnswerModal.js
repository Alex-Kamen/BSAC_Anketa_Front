class DeleteAnswerModal {
    template(param) {
        return `
            <div id="deleteAnswer${param.id}" class="modal">
                <h1>Вы действительно хотите удалить ответ</h1>
                <div class="form__control">
                    <button class="inline__button" onclick="new Data().methods.closeModal()">
                        Отмена
                    </button>
                    <button onclick="new DeleteAnswerModal().methods.deleteAnswer(${param.id})">
                        Удалить
                    </button>
                </div>
            </div>
        `
    }

    methods = {
        deleteAnswer(formId) {
            new Store().modules.form.getters.deleteAnswer(formId);
            new Data().methods.closeModal();
        },
    }
}
