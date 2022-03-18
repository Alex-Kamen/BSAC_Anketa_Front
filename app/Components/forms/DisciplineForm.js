class DisciplineForm {
    template(param = {}, departmentOptionList = []) {
        return `
            <div>
                ${new Input().template({placeholder: 'Название', inputId: `disciplineName${param.id || ''}`, value: param.name})}
                ${new Select().template({placeholder: 'Кафедра', inputId: `disciplineDepartment${param.id || ''}`, value: param.department, options: departmentOptionList})}
            </div>
        `
    }
}
