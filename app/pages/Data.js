class Data {
    template() {
        const isDepartmentManager = JSON.parse(localStorage.getItem('session')).status === 'departmentManager'

        return `${new Header().template()}
                ${new SubHeader().template()}
                <div class="data">
                    <div class="container">
                        <div class="addModal">
                            <div class="addUserModal"></div>
                            <div>${new AddDepartmentModal().template()}</div>
                            <div class="addDisciplineModal"></div>
                            <div>${new AddSpecialityModal().template()}</div>
                            <div class="addSpecializationModal"></div>
                        </div>
                        <div class="container">
                        <div class="data__list">
                            ${!isDepartmentManager ? `<div class="list">
                                <div class="list__header">
                                    <h1 class="list__title">Пользователи</h1>
                                    <button class="inline__button" onclick="new Data().methods.openModal('addUser')">Добавить пользователя</button>
                                </div>
                                <div class="userList"></div>
                            </div>` : ''}
                            ${!isDepartmentManager ? `<div class="list">
                                <div class="list__header">
                                    <h1 class="list__title">Кафедры</h1>
                                    <button class="inline__button" onclick="new Data().methods.openModal('addDepartment')">Добавить кафедру</button>
                                </div>
                                <div class="departmentList"></div>
                            </div>` : ''}
                            <div class="list">
                                <div class="list__header">
                                    <h1 class="list__title">Дисциплины</h1>
                                    <button class="inline__button" onclick="new Data().methods.openModal('addDiscipline')">Добавить дисциплину</button>
                                </div>
                                <div class="disciplineList"></div>
                            </div>
                            ${!isDepartmentManager ? `<div class="list">
                                <div class="list__header">
                                    <h1 class="list__title">Специальности</h1>
                                    <button class="inline__button" onclick="new Data().methods.openModal('addSpeciality')">Добавить специальность</button>
                                </div>
                                <div class="specialityList"></div>
                            </div>` : ''}
                            ${!isDepartmentManager ? `<div class="list">
                                <div class="list__header">
                                    <h1 class="list__title">Специализация</h1>
                                    <button class="inline__button" onclick="new Data().methods.openModal('addSpecializationModal')">Добавить специализацию</button>
                                </div>
                                <div class="specializationList"></div>
                            </div>` : ''}
                        </div>
                        </div>
                    </div>
                </div> 
            `
    }

    mounted() {
        if (JSON.parse(localStorage.getItem('session')).status !== 'departmentManager') {
            this.methods.departmentList();
            this.methods.specialityList();
            this.methods.userList();
            this.methods.specializationList();
        }

        this.methods.disciplineList();
    }

    methods = {
        departmentList() {
            new Store().modules.department.getters.departmentTable().then((result) => {
                let departmentBlock = document.querySelector('.departmentList');

                let formDataList = result.dataList.map((department) => {
                    return new EditDepartmentModal().template({id: department.data[0], name: department.data[1]}) +
                        new DeleteDepartmentModal().template({id: department.data[0], name: department.data[1]})
                }).join(' ');

                departmentBlock.innerHTML = new Table().template(result) + formDataList;
            })
        },

        disciplineList() {
            new Store().modules.discipline.getters.disciplineTable().then((result) => {
                new Store().modules.department.getters.departmentSelect().then((departmentSelect) => {
                    let disciplineBlock = document.querySelector('.disciplineList');

                    let formDataList = result.dataList.map((discipline) => {
                        return new EditDisciplineModal().template({id: discipline.data[0], name: discipline.data[1], department: discipline.data[2]}, departmentSelect.options) +
                            new DeleteDisciplineModal().template({id: discipline.data[0], name: discipline.data[1], department: discipline.data[2]})
                    }).join(' ');

                    disciplineBlock.innerHTML = new Table().template(result) + formDataList;
                    document.querySelector('.addDisciplineModal').innerHTML = new AddDisciplineModal().template(departmentSelect.options);
                })


            })
        },

        specializationList() {
            new Store().modules.specialization.getters.specializationTable().then((result) => {
                new Store().modules.speciality.getters.specialitySelect().then((specialitySelect) => {
                    let specializationBlock = document.querySelector('.specializationList');

                    let formDataList = result.dataList.map((specialization) => {
                        return new EditSpecializationModal().template({id: specialization.data[0], name: specialization.data[1], specialityId: specialization.data[2]}, specialitySelect.options) +
                            new DeleteSpecializationModal().template({id: specialization.data[0], name: specialization.data[1], specialityId: specialization.data[2]})
                    }).join(' ');

                    specializationBlock.innerHTML = new Table().template(result) + formDataList;
                    document.querySelector('.addSpecializationModal').innerHTML = new AddSpecializationModal().template(specialitySelect.options);
                })


            })
        },

        specialityList() {
            new Store().modules.speciality.getters.specialityTable().then((result) => {
                let specialityBlock = document.querySelector('.specialityList');

                let formDataList = result.dataList.map((speciality) => {
                    return new EditSpecialityModal().template({id: speciality.data[0], name: speciality.data[1]}) +
                        new DeleteSpecialityModal().template({id: speciality.data[0], name: speciality.data[1]})
                }).join(' ');

                specialityBlock.innerHTML = new Table().template(result) + formDataList;
            })
        },

        userList() {
            new Store().modules.user.getters.userTable().then((result) => {
                new Store().modules.specialization.getters.specializationSelect().then((specializationSelect) => {
                    let userBlock = document.querySelector('.userList');

                    let formDataList = result.dataList.map((user) => {
                        return new EditUserModal().template({id: user.data[0], login: user.data[1], status: new Store().modules.user.getters.userStatusByName(user.data[2]), specialization: user.data[3]}, specializationSelect.options) +
                            new DeleteUserModal().template({id: user.data[0], login: user.data[1], status: new Store().modules.user.getters.userStatusByName(user.data[2]), specialization: user.data[3]})
                    }).join(' ');

                    userBlock.innerHTML = new Table().template(result) + formDataList;
                    document.querySelector('.addUserModal').innerHTML = new AddUserModal().template(specializationSelect.options);
                })
            })
        },

        openModal(id) {
            const modal = document.querySelector(`.modal[id="${id}"]`);
            modal.style.left = '50%';
            modal.style.top = `${document.querySelector('html').offsetHeight / 2 - modal.offsetHeight/2}px`;
            modal.style.opacity = 1;
        },

        closeModal() {
            document.querySelectorAll(`.modal`).forEach((modal) => {
                modal.style.opacity = 0;
                setTimeout(() => {
                    modal.style.left = '-10000px';
                    modal.style.top = `50%`;
                }, 500);
            })

        }
    }
}
