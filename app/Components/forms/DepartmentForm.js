class DepartmentForm {
    template(param = {}) {
        return `
            <div>
                ${new Input().template({placeholder: 'Название', inputId: `departmentName${param.id || ''}`, value: param.name})}
            </div>
        `
    }
}
