class FormEditor {
    template() {
        return `
            ${new Header().template()}
            ${new SubHeader().template()}
            <div class="form">
                <div class="container">
                    <div class="questionsList">
                    </div>
                    <div class="button">
                        <button onclick="new Form().methods.saveForm()">Сохранить</button>
                    </div>
                </div>
            </div>    
        `;
    }

    mounted() {
        this.methods.renderForm();
    }

    methods = {
        renderForm() {
            return new Store().modules.form.getters.form().then((response) => {
                let questionList = '';

                response[0].questionList.forEach((questionItem, index) => {
                    questionList += new QuestionEditItem().template([...questionItem, index]);
                })

                setTimeout(() => {
                    document.querySelector('.questionsList').innerHTML = questionList;
                }, 0)
            })
        },

        saveForm() {
            if (!this.valid()) return;

            const recommendation = this.collectRecommends();
            const data = this.collectData();

            new Store().modules.form.getters.saveForm(data, recommendation);
            new Router().relocate('/formList');
        },

        collectRecommends() {
            const recommendsList = document.querySelectorAll('.recommends');

            let requestedRecommends = {};

            recommendsList.forEach((recommend) => {
                if (!requestedRecommends[recommend.name]) requestedRecommends[recommend.name] = [];

                if ((recommend.type === 'checkbox' && recommend.checked)
                    || (recommend.type !== 'checkbox' && recommend.value)) {
                    requestedRecommends[recommend.name].push(recommend.value);
                }
            });

            let recommends = [];

            for (const recommend in requestedRecommends) {
                if (requestedRecommends[recommend].length) {
                    recommends.push([recommend, requestedRecommends[recommend].join(', ')]);
                }
            }

            return recommends;
        },

        collectData() {
            const data = {
                marks: [],
                weights: []
            }

            const weightList = document.querySelectorAll('.weight');

            weightList.forEach((node) => {
                const id = node.id.replace('weight', '');
                data.marks[id] = +new QuestionInput().methods.getMark(id);
                data.weights[id] = +new QuestionInput().methods.getWeight(id)
            });

            return data;
        },

        valid() {
            const weightList = document.querySelectorAll('.weight');

            let isValid = true;

            weightList.forEach((node) => {
                isValid = !new QuestionInput().methods.errorMessage(node.id.replace('weight', '')) && isValid;
            })

            return isValid;
        }

    }
}
