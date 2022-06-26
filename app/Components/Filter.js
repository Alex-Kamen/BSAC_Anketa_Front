class Filter {
    template() {
        return `
        <div class="filter">
            <div class="filter__button"><img src="http://anketaback.vfbsac.by/static/img/filter.png" alt="filter" onclick="new Filter().methods.openFilter()"></div>
            <div class="filterBlock">
                <div class="formId"></div>
                <div class="login"></div>
                <div class="department"></div>
                <div class="discipline"></div>
                <div class="speciality"></div>
                <div class="specialization"></div>
                <div class="employeeType"></div>
                <div class="educationType"></div>
                <div class="age"></div>
                <div class="searchText"></div>
                <button onclick="new Filter().methods.saveFilter()">Отправить</button>
            </div>
        </div>    
    `
    }

    mounted() {
        const params = window.location.search.slice(1).split('&').map((param) => {
            const name = param.slice(0, param.indexOf('='));
            const value = param.slice(param.indexOf('=')+1);
            return {name, value: decodeURI(value)};
        });

        let searchText = params.find((param) => param.name === 'searchText') || {};

        this.methods.formList(params.find((param) => param.name === 'formId'));
        this.methods.specialityList(params.find((param) => param.name === 'speciality'));
        this.methods.specializationList(params.find((param) => param.name === 'specialization'));
        this.methods.disciplineList(params.find((param) => param.name === 'discipline'));
        this.methods.loginList(params.find((param) => param.name === 'login'));
        this.methods.educationTypeList(params.find((param) => param.name === 'educationType'));

        if (JSON.parse(localStorage.getItem('session')).status !== 'departmentManager') {
            this.methods.employeeTypeList(params.find((param) => param.name === 'employeeType'));
            this.methods.departmentList(params.find((param) => param.name === 'department'));
            this.methods.ageList(params.find((param) => param.name === 'age'));

            document.querySelector('.searchText').innerHTML = new Input().template(
                {placeholder: 'Другое', inputId: 'searchText', value: searchText.value}
            );
        }
    }

    methods = {
        formList(value = {}) {
            new Store().modules.form.getters.formSelect().then((result) => {
                result.value = value.value;
                document.querySelector('.formId').innerHTML = new Select().template(result);
            })
        },

        departmentList(value = {}) {
            new Store().modules.department.getters.departmentSelect().then((result) => {
                result.value = value.value;
                document.querySelector('.department').innerHTML = new Select().template(result);
            })
        },

        disciplineList(value = {}) {
            new Store().modules.discipline.getters.disciplineSelect().then((result) => {
                result.value = value.value;
                document.querySelector('.discipline').innerHTML = new Select().template(result);
            })
        },

        specialityList(value = {}) {
            new Store().modules.speciality.getters.specialitySelect().then((result) => {
                result.value = value.value;
                document.querySelector('.speciality').innerHTML = new Select().template(result);
            })
        },

        employeeTypeList(value = {}) {
            let select = new Store().modules.settings.getters.employeeTypeSelect();
            select.value = value.value;
            document.querySelector('.employeeType').innerHTML = new Select().template(select);
        },

        educationTypeList(value = {}) {
            let select = new Store().modules.settings.getters.educationTypeSelect();
            select.value = value.value;
            document.querySelector('.educationType').innerHTML = new Select().template(select);
        },

        ageList(value = {}) {
            let select = new Store().modules.settings.getters.ageSelect();
            select.value = value.value;
            document.querySelector('.age').innerHTML = new Select().template(select);
        },

        loginList(value = {}) {
            new Store().modules.user.getters.loginSelect().then((result) => {
                result.value = value.value;
                document.querySelector('.login').innerHTML = new Select().template(result);
            })
        },

        specializationList(value = {}) {
            new Store().modules.specialization.getters.specializationSelect().then((result) => {
                result.value = value.value;
                document.querySelector('.specialization').innerHTML = new Select().template(result);
            })
        },

        saveFilter() {
            const formId = new Select().methods.getSelectValue('formId');
            const discipline = new Select().methods.getSelectValue('discipline');
            const speciality = new Select().methods.getSelectValue('speciality');
            const educationType = new Select().methods.getSelectValue('educationType');
            const login = new Select().methods.getSelectValue('login');
            const specialization = new Select().methods.getSelectValue('specialization');
            let employeeType, department, age, searchText;

            if (JSON.parse(localStorage.getItem('session')).status !== 'departmentManager') {
                employeeType = new Select().methods.getSelectValue('employeeType');
                department = new Select().methods.getSelectValue('department');
                age = new Select().methods.getSelectValue('age');
                searchText = new Input().methods.getInputValue('searchText');
            }

            if (JSON.parse(localStorage.getItem('session')).status === 'departmentManager') {
                department = JSON.parse(localStorage.getItem('session')).departmentId;
            }

            let requestLine = '?';
            let paramCount = 0;

            if (formId) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `formId=${formId}`;
                paramCount++;
            }

            if (department) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `department=${department}`;
                paramCount++;
            }

            if (login) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `login=${login}`;
                paramCount++;
            }

            if (discipline) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `discipline=${discipline}`;
                paramCount++;
            }

            if (speciality) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `speciality=${speciality}`;
                paramCount++;
            }

            if (employeeType) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `employeeType=${employeeType}`;
                paramCount++;
            }

            if (educationType) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `educationType=${educationType}`;
                paramCount++;
            }

            if (age) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `age=${age}`;
                paramCount++;
            }

            if (specialization) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `specialization=${specialization}`;
                paramCount++;
            }

            if (searchText) {
                if (paramCount > 0) requestLine += '&';

                requestLine += `searchText=${searchText}`;
            }

            new Router().relocate(requestLine);
        },

        openFilter() {
            const filter = document.querySelector('.filterBlock');

            if (filter.style.opacity == '0') {
                filter.style.right = '25px';
                filter.style.opacity = '1';
            } else {
                filter.style.right = '-1000px';
                filter.style.opacity = '0';
            }
        }
    }

}
