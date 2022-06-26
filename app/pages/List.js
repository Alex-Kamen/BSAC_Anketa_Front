class List {
    template() {
        return `${new Header().template()}
                ${new SubHeader().template()}
                <div class="answers">
                    <div class="container">
                        <div class="filter__button report"><img src="http://anketaback.vfbsac.by/static/img/file.png" alt="report" onclick="new Dashboard().methods.report()"></div>
                        ${new Filter().template()}
                        <div class="answers__inner">
                            <div class="answers__header">
                                <h1 class="answers__title">Список ответов</h1>
                            </div>
                            <div class="answers__table">
                            
                            </div>
                            <div class="answers__modals">
                            
                            </div>
                            <div class="delete__answer">
                            
                            </div>
                        </div>
                    </div>
                </div> 
            `
    }

    mounted() {
        this.methods.renderList();
        new Filter().mounted();
    }

    methods = {
        renderList() {
            new Store().modules.answer.getters.list().then((response) => {
                const header = ['Дата', 'Форма', 'Логин', ''];
                let dataList = [];
                let dataModals = '';
                let deleteModals = '';

                if (JSON.parse(localStorage.getItem('session')).status === 'departmentManager') {
                    header.pop();
                }

                for (const answer of response.answerList) {
                    const formData = response.formData.find(form => form.id === answer.formId);
                    const formName = formData ? formData.name : '';
                    const action = `
                    <div class="actions">
                        <img src="http://anketaback.vfbsac.by/static/img/delete.png" alt="edit" onclick="new Data().methods.openModal('deleteAnswer${answer.id}')">
                    </div>
                `
                    dataList.push({data: [answer.time, formName, answer.login, action], object: answer});

                    if (JSON.parse(localStorage.getItem('session')).status === 'departmentManager') {
                        dataList[dataList.length-1].data.pop();
                    }

                    let dataModal = {
                        answer: answer,
                        formData: this.getFormById(answer.formId, response.formData)
                    }

                    dataModals += new DataModal().template(dataModal);
                    deleteModals += new DeleteAnswerModal().template(answer);
                }

                document.querySelector('.answers__title').innerHTML = `Список ответов. Всего ответов - ${response.answerList.length}`

                document.querySelector('.answers__modals').innerHTML = dataModals;
                document.querySelector('.delete__answer').innerHTML = deleteModals;
                document.querySelector('.answers__table').innerHTML = new Table().template({header, dataList});
            })
        },

        getFormById(formId, formList) {
            return formList.find(form => form.id === formId);
        },

        openAnswer(answerId) {
            const modal = document.querySelector(`.modal[id="data${answerId}"]`);
            document.querySelectorAll(`.modal`).forEach((dataModal) => {
                dataModal.style.opacity = 0;
                dataModal.style.left = '-10000px';
            })

            modal.style.left = '50%';
            modal.style.top = `${document.querySelector('html').offsetHeight / 2 - modal.offsetHeight/2 + document.querySelector('body').scrollTop}px`;
            modal.style.opacity = 1;
        },

        closeModal(answerId) {
            const modal = document.querySelector(`.modal[id="data${answerId}"]`);
            modal.style.opacity = 0;
            setTimeout(() => {
                modal.style.left = '-10000px';
            }, 500);
        }
    }
}
