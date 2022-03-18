class QuestionItem {
    template(params) {
        const questionItem = this.methods.renderQuestion(params);
        return `
            ${questionItem}
        `
    }

    methods = {
        renderQuestion(params) {
            if (params[0] === 'input') {
                return new QuestionInput().template({name: params[1], id: params[2]});
            } else if (params[0] === 'checkbox') {
                return new Checkbox().template({name: params[1], options: params[2], header: params[3], id: params[4]});
            } else if (params[0] === 'textArea') {
                return new TextArea().template({placeholder: params[1], header: params[2], id: params[3]});
            }
        }
    }
}
