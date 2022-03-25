class FormItem {
    template(props, data) {
        return `
            <div 
                class="form__item" 
                id="form${props.id}"  
                onclick="new FormItem().methods.callForm(${props.id})" 
            >
                <h3 class="form__title visible">${props.name}</h3>
                <div class="form__login hidden">
                    ${this.methods.renderTagsInput(props, data)}
                    <button name="submit" onclick="new FormItem().methods.openForm(${props.id})">Заполнить анкету</button>
                </div>
            </div>
    `
    }

    methods = {
        callForm(id) {
            document.querySelectorAll(`.form__item`).forEach((form) => {
                this.deactivateForm(form.id);
            });

            this.activateForm(id);
        },

        activateForm(id) {
            const formItem = document.querySelector(`#form${id}`);
            const formTitle = document.querySelector(`#form${id} .form__title`);
            const formInput = document.querySelector(`#form${id} .form__login`);

            formItem.className = "form__item active";
            formTitle.className = "form__title hidden";
            formInput.className = "form__login visible"
        },

        deactivateForm(id) {
            const formItem = document.querySelector(`#${id}`);
            const formTitle = document.querySelector(`#${id} .form__title`);
            const formInput = document.querySelector(`#${id} .form__login`);

            formItem.className = "form__item";
            formTitle.className = "form__title visible";
            formInput.className = "form__login hidden"
        },

        openForm(id) {
            if (!this.valid(id)) return;

            let tags = []

           document.querySelectorAll(`#form${id} .form__login input`)
               .forEach((node) => {
                   tags.push([node.getAttribute('inputName'), node.hasAttribute('selected') ? node.getAttribute('selected') : node.value])
               });

           localStorage.setItem('tags', JSON.stringify(tags));

           new Router().relocate(`/form/${id}`);
        },

        valid(id) {
            let inputList = []

            document.querySelectorAll(`#form${id} .form__login input`)
                .forEach((node) =>
                    inputList.push({
                        inputId: node.id.replace('input', ''),
                        inputType: node.className
                    })
                );

            let isValid = true;

            inputList.forEach((input) => {
                if (input.inputType === '') {
                    isValid = !new Input().methods.errorMessage(`${input.inputId}`) && isValid;
                } else {
                    isValid = !new Select().methods.errorMessage(`${input.inputId}`) && isValid;
                }
            })

            return isValid
        },

        renderTagsInput(form, data) {
            let tagsInput = '';

            form.tags.forEach((tag, tagId) => {
                if (tag[0] === 'input') {
                    tagsInput += new Input().template({placeholder: tag[1], inputId: `${form.id}_${tagId}`, inputName: 'searchText'});
                } else {
                    tagsInput += new Select().template(
                        {
                            placeholder: tag[0],
                            inputId: `${form.id}_${tagId}`,
                            options: data[tag[1]].map(option => ({value: option.id || option, name: option.name || option})),
                            inputName: tag[1]
                        }
                    );
                }
            })

            return tagsInput;
        }
    }

}
