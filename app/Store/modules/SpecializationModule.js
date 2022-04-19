class SpecializationModule {
    getters = {
        'specializationList': () => {
            return fetch(`http://anketaback.vfbsac.by/specialization/list`).then(response => response.json());
        },

        'specializationSelect': () => {
            return this.getters['specializationList']().then((result) => {
                return {
                    placeholder: 'Специализация',
                    inputId: 'specialization',
                    options: result.map((specializationItem) => ({name: specializationItem.name, value: specializationItem.id}))
                }
            })
        },

        'specializationTable': () => {
            return this.getters['specializationList']().then((specializationList) => {
                return {
                    header: ['id', 'Специализация', 'Специальность', ''],
                    dataList: specializationList.map((specialization) => ({data:
                            [
                                specialization.id,
                                specialization.name,
                                specialization.specialityName,
                                this.getters.specializationActions(specialization.id)
                            ]}))
                }
            })
        },

        'specializationActions': (modalId) => {
            return `
                <div class="actions">
                    <img src="http://anketaback.vfbsac.by/static/img/edit.png" alt="edit" onclick="new Data().methods.openModal('specializationEdit${modalId}')">
                    <img src="http://anketaback.vfbsac.by/static/img/delete.png" alt="edit" onclick="new Data().methods.openModal('deleteSpecialization${modalId}')">
                </div>
            `
        },

        'addSpecialization': (specialization) => {
            return fetch('http://anketaback.vfbsac.by/specialization/add', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(specialization),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'editSpecialization': (specialization) => {
            return fetch('http://anketaback.vfbsac.by/specialization/edit', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(specialization),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'deleteSpecialization': (specialization) => {
            return fetch('http://anketaback.vfbsac.by/specialization/delete', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({id: specialization}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },
    }
}
