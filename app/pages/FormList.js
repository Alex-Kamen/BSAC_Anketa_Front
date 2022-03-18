class FormList {
    template() {
        return `
            ${new Header().template()}
            <div class="form">
                <div class="container">
                    <div class="form__list">
                    </div>
                </div>
            </div>`
    }

    mounted() {
        this.methods.renderFormList();
    }

    methods = {
        renderFormList() {
            return new Store().modules.form.getters.list().then((response) => {
                let formList = '';

                for (const formItem of response.data) {
                    formList += new FormItem().template(formItem, response);
                }

                document.querySelector('.form__list').innerHTML = formList;
            })
        },
    }
}
