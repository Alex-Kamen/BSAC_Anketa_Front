class SpecialityForm {
    template(param = {}) {
        return `
            <div>
                ${new Input().template({placeholder: 'Название', inputId: `specialityName${param.id || ''}`, value: param.name})}
            </div>
        `
    }
}
