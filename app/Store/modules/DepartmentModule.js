class DepartmentModule {
    getters = {
        'departmentList': () => {
            return fetch(`http://anketaback.vfbsac.by/department/list`).then(response => response.json());
        },

        'departmentSelect': () => {
            return this.getters['departmentList']().then((result) => {
                return {
                    placeholder: 'Кафедра',
                    inputId: 'department',
                    options: result.map((departmentItem) => ({name: departmentItem.name, value: departmentItem.id}))
                }
            })
        },

        'departmentActions': (modalId) => {
            return `
                <div class="actions">
                    <img src="http://anketaback.vfbsac.by/static/img/edit.png" alt="edit" onclick="new Data().methods.openModal('departmentEdit${modalId}')">
                    <img src="http://anketaback.vfbsac.by/static/img/delete.png" alt="edit" onclick="new Data().methods.openModal('deleteDepartment${modalId}')">
                </div>
            `
        },

        'departmentTable': () => {
            return this.getters['departmentList']().then((departmentList) => {
                return {
                    header: ['id', 'Кафедра', ''],
                    dataList: departmentList.map((department) => ({data:
                            [
                                department.id,
                                department.name,
                                this.getters.departmentActions(department.id)
                            ]}))
                }
            })
        },

        'addDepartment': (department) => {
            return fetch('http://anketaback.vfbsac.by/department/add', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({name: department}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'editDepartment': (department) => {
            return fetch('http://anketaback.vfbsac.by/department/edit', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(department),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'deleteDepartment': (department) => {
            return fetch('http://anketaback.vfbsac.by/department/delete', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({id: department}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },
    }
}
