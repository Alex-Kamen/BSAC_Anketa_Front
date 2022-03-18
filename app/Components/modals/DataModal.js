class DataModal {
    template(params) {
        return `
            <div class="modal dataModal" id="data${params.answer.id}">
                <div style="position: relative">
                    <div class="close" onclick="new List().methods.closeModal(${params.answer.id})">
                     <img src="http://anketaback.vfbsac.by/static/img/close.png" alt="close">
                    </div>
                </div>
                
                <div class="data__header">
                    <h1 class="data__title">${params.formData.name}</h1>
                </div>
                <div class="data__body">
                    ${this.methods.renderAnswerList(params)}
                </div>
            </div>
        `
    }

    methods = {
        renderAnswerList(answerList) {
            let answerData = '';

            for (let i = 0; i < answerList.answer.weights.length; i++) {
                answerData += `
                    <div>
                        <h3>${answerList.formData.questionList[i][1]}</h3>
                        <p>Важность: ${answerList.answer.weights[i]}</p>
                        <p>Оценка: ${answerList.answer.marks[i]}</p>
                    </div>
                `;
            }

            answerList.answer.recommendation.forEach((recommendation) => {
                answerData += `
                    <div>
                        <h3>${recommendation[0]}</h3>
                        <p>${recommendation[1]}</p>
                    </div>
                `;
            });

            return answerData;
        }
    }
}
