class SpecializationForm {
    template(param = {}, specialityOptionList = []) {
        return `
            <div>
                ${new Input().template({placeholder: 'Название', inputId: `specializationName${param.id || ''}`, value: param.name})}
                ${new Select().template({placeholder: 'Специальность', inputId: `specializationSpeciality${param.id || ''}`, value: param.specialityId, options: specialityOptionList})}
            </div>
        `
    }
}
