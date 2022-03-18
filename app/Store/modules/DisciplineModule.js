class DisciplineModule {
    getters = {
        'disciplineList': () => {
            return fetch(`http://anketaback.vfbsac.by/discipline/list`).then(response => response.json());
        },

        'disciplineListByDepartmentId': (id) => {
            return fetch(`http://anketaback.vfbsac.by/discipline/list?department=${id}`).then(response => response.json());
        },

        'disciplineSelect': () => {
            return this.getters['disciplineList']().then((result) => {
                return {
                    placeholder: 'Дисциплина',
                    inputId: 'discipline',
                    options: result.map((disciplineItem) => ({name: disciplineItem.name, value: disciplineItem.id}))
                }
            })
        },

        'disciplineActions': (modalId) => {
            return `
                <div class="actions">
                    <img src="http://anketaback.vfbsac.by/static/img/edit.png" alt="edit" onclick="new Data().methods.openModal('disciplineEdit${modalId}')">
                    <img src="http://anketaback.vfbsac.by/static/img/delete.png" alt="edit" onclick="new Data().methods.openModal('deleteDiscipline${modalId}')">
                </div>
            `
        },

        'disciplineTable': () => {
            return this.getters['disciplineList']().then((disciplineList) => {
                return {
                    header: ['id', 'Дисциплина', 'Кафедра', ''],
                    dataList: disciplineList.map((discipline) => ({data:
                            [
                                discipline.id,
                                discipline.name,
                                discipline.department,
                                this.getters.disciplineActions(discipline.id)
                            ]}))
                }
            })
        },

        'addDiscipline': (discipline) => {
            return fetch('http://anketaback.vfbsac.by/discipline/add', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(discipline),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'editDiscipline': (discipline) => {
            return fetch('http://anketaback.vfbsac.by/discipline/edit', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(discipline),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'deleteDiscipline': (discipline) => {
            return fetch('http://anketaback.vfbsac.by/discipline/delete', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({id: discipline}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },
    }
}
