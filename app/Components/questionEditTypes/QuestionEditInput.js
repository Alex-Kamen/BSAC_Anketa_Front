class QuestionEditInput {
    template(params) {
        return `
            <div class="question input">
                <p class="question__name">
                    <p class="questionEdit__title">Вопрос</p>
                    <input placeholder="Введите вопрос" value="${params.name}" style="width: 90%"/>
                </p>
                <div class="error" id="error${params.id}">
                        <p></p>
                    </div>
            </div>
        `
    }

    methods = {
        getMark(id) {
            return document.querySelector(`#mark${id}`).value;
        },

        getWeight(id) {
            return document.querySelector(`#weight${id}`).value;
        },

        validMark(id) {
            const mark = this.getMark(id);
            return mark <= 10 && mark >= 0;
        },

        validWeight(id) {
            const weight = this.getWeight(id);
            return weight <= 10 && weight >= 0;
        },

        required(id) {
            return this.getWeight(id) && this.getMark(id);
        },

        validQuestion(id) {
            return +this.getMark(id) <= +this.getWeight(id);
        },

        errorMessage(id) {
            if (!this.required(id)) {
                document.querySelector(`#error${id} p`).innerHTML = 'Необходимо заполнить оба поля';
                return true;
            } else if (!this.validQuestion(id)) {
                document.querySelector(`#error${id} p`).innerHTML = 'Вес должен быть больше либо равен оценки';
                return true;
            } else if (!this.validWeight(id)) {
                document.querySelector(`#error${id} p`).innerHTML = 'Вес должен быть числом от 0 до 10';
                return true;
            } else if (!this.validMark(id)) {
                document.querySelector(`#error${id} p`).innerHTML = 'Оценка должна быть числом от 0 до 10';
                return true;
            } else {
                document.querySelector(`#error${id} p`).innerHTML = '';
                return false;
            }
        }
    }
}
