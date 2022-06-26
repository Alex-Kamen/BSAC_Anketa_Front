class QuestionEditTextArea {
    template(params) {
        return `
           <div class="question input">
                <p class="question__name">
                    <p class="questionEdit__title">Вопрос</p>
                    <input placeholder="Введите вопрос" value="${params.placeholder}" style="width: 90%"/>
                    <p class="questionEdit__subtitle">Название поля в отчёте</p>
                    <input placeholder="Название поля в отчёте" value="${params.header}" style="width: 90%"/>
                </p>
                <div class="error" id="error${params.id}">
                        <p></p>
                    </div>
            </div>
        `
    }
}
