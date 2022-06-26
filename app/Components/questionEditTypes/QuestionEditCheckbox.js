class QuestionEditCheckbox {
    template(params) {
        return `
        <div class="question checkbox">
            <p class="questionEdit__title">Вопрос</p>
            <input placeholder="Введите вопрос" value="${params.name}" style="width: 90%"/>
            <div class="questionEdit__subtitle">Варианты ответов:</div>
            <div>
                <div>
                    <div class="checkboxList">
                        ${this.methods.renderOption(params)}
                    </div>
                </div>
            </div>
        </div>
        `
    }

    methods = {
        renderOption(params) {
            let optionList = ``;

            params.options.forEach((option) =>
                optionList += `<div class="checkboxEditItem">
                                <input 
                                    class="recommends"
                                    name="${params.header}" 
                                    value="${option}"
                                    placeholder="Вариант ответа"
                                >
                                </div>`
            );

            return optionList;
        },
    }
}
