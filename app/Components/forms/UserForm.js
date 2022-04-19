class UserForm {
    template(param = {}, specializationOptionList = []) {
        const options = [
            {value: 'student', name: 'Студент'},
            {value: 'hirer', name: 'Работодатель'},
            {value: 'staff', name: 'Персонал'},
            {value: 'admin', name: 'Администратор'},
            {value: 'departmentManager', name: 'Зав. ф. кафедры'},
        ]

        return `
            <div>
                ${new Input().template({placeholder: 'Логин', inputId: `userLogin${param.id || ''}`, value: param.login})}
                ${new Input().template({placeholder: 'Пароль', inputId: `userPassword${param.id || ''}`, value: param.password, type: 'password'})}
                ${new Select().template({placeholder: 'Роль', inputId: `userStatus${param.id || ''}`, value: param.status, options})}
                ${param.status === 'student' || typeof param.status === 'undefined'
            ? new Select().template({placeholder: 'Специализация', inputId: `userSpecialization${param.id || ''}`, value: param.specialization, options: specializationOptionList})
            : ''
                }
            </div>
        `
    }
}
