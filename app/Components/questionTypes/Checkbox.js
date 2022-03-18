class Checkbox {
    template(params) {
        return `
        <div class="question checkbox">
            <p>${params.name}</p>
            <div class="question__form">
                <div class="question__item">
                    <div class="checkboxList">
                        ${this.methods.renderOption(params)}
                    </div>
                </div>
            </div>
            <div class="question__item">
                <p>Другое</p>
                <input type="text" name="${params.header}" class="recommends">
            </div>
        </div>
        `
    }

    methods = {
        renderOption(params) {
            let optionList = ``;

            params.options.forEach((option) =>
                optionList += `<div class="checkboxItem">
                                <input 
                                    type="checkbox" 
                                    class="recommends"
                                    name="${params.header}" 
                                    value="${option}"
                                >
                                    ${option}
                                </div>`
            );

            return optionList;
        },
    }
}
