class SpecialityModule {
    getters = {
        'specialityList': () => {
            return fetch(`http://anketaback.vfbsac.by/speciality/list`).then(response => response.json());
        },

        'specialitySelect': () => {
            return this.getters['specialityList']().then((result) => {
                return {
                    placeholder: 'Специальность',
                    inputId: 'speciality',
                    options: result.map((specialityItem) => ({name: specialityItem.name, value: specialityItem.id}))
                }
            })
        },

        'specialityActions': (modalId) => {
            return `
                <div class="actions">
                    <img src="http://anketaback.vfbsac.by/static/img/edit.png" alt="edit" onclick="new Data().methods.openModal('specialityEdit${modalId}')">
                    <img src="http://anketaback.vfbsac.by/static/img/delete.png" alt="edit" onclick="new Data().methods.openModal('deleteSpeciality${modalId}')">
                </div>
            `
        },

        'specialityTable': () => {
            return this.getters['specialityList']().then((specialityList) => {
                return {
                    header: ['id', 'Специальность', ''],
                    dataList: specialityList.map((speciality) => ({data:
                            [
                                speciality.id,
                                speciality.name,
                                this.getters.specialityActions(speciality.id)
                            ]}))
                }
            })
        },

        'addSpeciality': (speciality) => {
            return fetch('http://anketaback.vfbsac.by/speciality/add', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({name: speciality}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'editSpeciality': (speciality) => {
            return fetch('http://anketaback.vfbsac.by/speciality/edit', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(speciality),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'deleteSpeciality': (speciality) => {
            return fetch('http://anketaback.vfbsac.by/speciality/delete', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({id: speciality}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },
    }


}
