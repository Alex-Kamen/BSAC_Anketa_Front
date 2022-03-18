class Select {
    template(params) {
        let value = params.options.find((option) => option.value === params.value)
            || params.options.find((option) => option.name === params.value) || {};

        return `
            <div class="selectBlock input">
                <input 
                    type="text"
                    class="select"
                    id="input${params.inputId}" 
                    placeholder="${params.placeholder}" 
                    oninput="new Select().methods.rerenderOptionList('${params.inputId}', '${JSON.stringify(params.options).replace(/"/g, '\`')}')"
                    onclick="new Select().methods.openOptionList('${params.inputId}')"
                    value="${value.name || ''}"
                    selected="${value.value || ''}"
                    inputName="${params.inputName || ''}"
                    autocomplete="off"
                >
                <div class="optionWrapper">
                    <div class="optionList hidden" id="optionList${params.inputId}" >
                        ${this.methods.getOptionList(params.inputId, params.options)}
                    </div>
                </div>
                
                <p class="error" id="error${params.inputId}"></p>
            </div>
            
        `
    }

    methods = {
        getInputValue(inputId) {
            return document.querySelector(`#input${inputId}`).value;
        },

        getSelectValue(inputId) {
            return document.querySelector(`#input${inputId}`).getAttribute('selected');
        },

        validateInput(inputId) {
            return this.getInputValue(inputId);
        },

        validateInputValue(inputId, options) {
            const input = document.querySelector(`#input${inputId}`);
            let selectedOption = options.find((option) => option.name === input.value);

            return selectedOption === input.getAttribute('selected') && input.getAttribute('selected') !== '';
        },

        errorMessage(inputId, options) {
            let errorMessage = document.querySelector(`#error${inputId}`);

            if (!errorMessage) return false;

            let isError = false;

            if (!this.validateInput(inputId)) {
                errorMessage.innerHTML = 'Поле обязательно для заполнения';
                isError = true;
            }

            if (this.validateInputValue(inputId, options)) {
                errorMessage.innerHTML = 'Необходимо выбрать вариант из списка';
                isError = true;
            }

            if (!isError) {
                errorMessage.innerHTML = '';
                return false;
            } else {
                return true;
            }
        },

        openOptionList(inputId) {
            let className = document.querySelector(`#optionList${inputId}`).className
            if (className === 'optionList visible') {
                document.querySelector(`#optionList${inputId}`).className = 'optionList hidden';
            } else {
                document.querySelector(`#optionList${inputId}`).className = 'optionList visible';
            }
        },

        getOptionList(inputId, options) {
            let optionList = ``;

            options.forEach((option) => {
                optionList += `<p 
                                class="optionItem" 
                                onclick="new Select().methods.setInputValue('${inputId}', '${option.value}', '${option.name}')"
                               >${option.name}</p>`;
            });

            return optionList;
        },

        setInputValue(inputId, value, name) {
            document.querySelector(`#input${inputId}`).value = name;
            document.querySelector(`#input${inputId}`).setAttribute('selected', value);
        },

        rerenderOptionList(inputId, options) {
            options = JSON.parse(options.replace(/`/g, '"'));
            this.errorMessage(inputId, options);
            const newList = options.filter((option) => option.name.match(new RegExp(`.*${this.getInputValue(inputId)}.*`)));
            document.querySelector(`#optionList${inputId}`).innerHTML = this.getOptionList(inputId, newList);
        },

        reset(inputId) {
            document.querySelector(`#input${inputId}`).value = '';
            document.querySelector(`#input${inputId}`).setAttribute('selected', '');
        }
    }
}
