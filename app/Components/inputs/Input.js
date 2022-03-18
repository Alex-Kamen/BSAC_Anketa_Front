class Input {
    template(params = {}) {
        return `
            <div class="input">
                 <input 
                    type="${params.type || 'text'}"  
                    id="input${params.inputId}" 
                    placeholder="${params.placeholder}" 
                    oninput="new Input().methods.errorMessage('${params.inputId}')"
                    value="${params.value || ''}"
                    inputName="${params.inputName || ''}"
                >
                <p class="error" id="error${params.inputId}"> </p>
            </div>
           
        `
    }

    methods = {
        getInputValue(inputId) {
            return document.querySelector(`#input${inputId}`).value;
        },

        validateInput(inputId) {
            return this.getInputValue(inputId);
        },

        errorMessage(inputId) {
            const errorMessage = document.querySelector(`#error${inputId}`);

            if (!errorMessage) return false;

            if (!this.validateInput(inputId)) {
                errorMessage.innerHTML = 'Поле обязательно для заполнения';
                return true;
            } else {
                errorMessage.innerHTML = '';
                return false;
            }
        },

        reset(inputId) {
            document.querySelector(`#input${inputId}`).value = '';
        }
    }
}
