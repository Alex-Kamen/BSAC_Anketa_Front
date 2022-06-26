class FilterData {
    template() {
        return `
        <div class="filterData">
            <div class="container">
                <div class="filter__form"></div>
                <div>Фильтрация по</div>
                <div class="filter__login"></div>
                <div class="filter__department"></div>
                <div class="filter__discipline"></div>
                <div class="filter__speciality"></div>
                <div class="filter__specialization"></div>
                <div class="filter__employeeType"></div>
                <div class="filter__educationType"></div>
                <div class="filter__age"></div>
                <div class="filter__searchText"></div>
            </div>
        </div>
    `
    }

    mounted() {
        const filterData = window.location.search.slice(1).split('&').map((param) => {
            if (param) {
                const name = param.slice(0, param.indexOf('='));
                const value = param.slice(param.indexOf('=')+1);
                return {name, value: decodeURI(value)};
            }

            return undefined;
        }).filter((param) => param);

        this.methods.form(filterData.find((param) => param.name === 'formId'));
        this.methods.login(filterData.find((param) => param.name === 'login'));
        this.methods.department(filterData.find((param) => param.name === 'department'));
        this.methods.discipline(filterData.find((param) => param.name === 'discipline'));
        this.methods.speciality(filterData.find((param) => param.name === 'speciality'));
        this.methods.specialization(filterData.find((param) => param.name === 'specialization'));
        this.methods.age(filterData.find((param) => param.name === 'age'));
        this.methods.educationType(filterData.find((param) => param.name === 'educationType'));
        this.methods.employeeType(filterData.find((param) => param.name === 'employeeType'));
        this.methods.searchText(filterData.find((param) => param.name === 'searchText'));
    }

    methods = {
        form(value = {}) {
            new Store().modules.form.getters.list().then((formList) => {
                const form = formList.data.filter((formItem) => formItem.id == value.value);

                if (form) {
                    document.querySelector('.filter__form').innerHTML = form[0] ? form[0].name : 'Форма не выбрана';
                }
            })
        },

        login(value = {}) {
            new Store().modules.user.getters.userList().then((userList) => {
                const user = userList.filter((userItem) => userItem.login === value.value);

                if (user) {
                    document.querySelector('.filter__login').innerHTML = `Логин: ${user[0] ? user[0].login : 'По всему'}`;
                }
            })
        },

        department(value = {}) {
            new Store().modules.department.getters.departmentList().then((departmentList) => {
                const department = departmentList.filter((departmentItem) => departmentItem.id == value.value);

                if (department) {
                    document.querySelector('.filter__department').innerHTML = `Кафедра: ${department[0] ? department[0].name : 'По всему'}`;
                }
            })
        },

        discipline(value = {}) {
            new Store().modules.discipline.getters.disciplineList().then((disciplineList) => {
                const discipline = disciplineList.filter((disciplineItem) => disciplineItem.id == value.value);

                if (discipline) {
                    document.querySelector('.filter__discipline').innerHTML = `Дисциплина: ${discipline[0] ? discipline[0].name : 'По всему'}`;
                }
            })
        },

        speciality(value = {}) {
            new Store().modules.speciality.getters.specialityList().then((specialityList) => {
                const speciality = specialityList.filter((specialityItem) => specialityItem.id == value.value);

                if (speciality) {
                    document.querySelector('.filter__speciality').innerHTML = `Специальность : ${speciality[0] ? speciality[0].name : 'По всему'}`;
                }
            })
        },

        specialization(value = {}) {
            new Store().modules.specialization.getters.specializationList().then((specializationList) => {
                const specialization = specializationList.filter((specializationItem) => specializationItem.id == value.value);

                if (specialization) {
                    document.querySelector('.filter__specialization').innerHTML = `Специализация: ${specialization[0] ? specialization[0].name : 'По всему'}`;
                }
            })
        },

        employeeType(value = {}) {
            const employeeType = ['АУП', 'ППС', 'УВП', 'ПОП'].filter((type) => type === value.value);

            document.querySelector('.filter__employeeType').innerHTML = `Тип персонала: ${employeeType[0] ? employeeType[0] : 'По всему'}`;
        },

        educationType(value = {}) {
            const educationType = ['ДФПО', 'ЗФПО'].filter((type) => type === value.value);

            document.querySelector('.filter__educationType').innerHTML = `Тип получения образования: ${educationType[0] ? educationType[0] : 'По всему'}`;
        },

        age(value = {}) {
            const age = ['до 35 лет', 'от 35 до 55 лет', 'старше 55 лет'].filter((type) => type === value.value);

            document.querySelector('.filter__age').innerHTML = `Возрастная категория персонала: ${age[0] ? age[0] : 'По всему'}`;
        },

        searchText(value = {}) {
            document.querySelector('.filter__searchText').innerHTML = `Другое: ${value.value ? value.value : '-'}`
        }
    }

}
