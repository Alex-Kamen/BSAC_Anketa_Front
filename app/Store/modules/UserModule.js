class UserModule {
    getters = {
        'auth': (login, password) => {
            return fetch('http://anketaback.vfbsac.by/auth', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({login, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json());
        },

        'userList': () => {
            return fetch(`http://anketaback.vfbsac.by/user/list`).then(response => response.json());
        },

        'userStatus': () => {
          return {
              'staff': 'Персонал',
              'hirer': 'Работодатель',
              'admin': 'Администратор',
              'student': 'Студент',
              'departmentManager': 'Зав. ф. кафедры'
          }
        },

        'userActions': (modalId) => {
            return `
                <div class="actions">
                    <img src="http://anketaback.vfbsac.by/static/img/edit.png" alt="edit" onclick="new Data().methods.openModal('userEdit${modalId}')">
                    <img src="http://anketaback.vfbsac.by/static/img/delete.png" alt="edit" onclick="new Data().methods.openModal('deleteUser${modalId}')">
                </div>
            `
        },

        'userStatusByName': (status) => {
          const userStatusList = this.getters.userStatus();

          for (const statusId in userStatusList) {
              if (userStatusList[statusId] === status) return statusId;
          }
        },

        'userTable': () => {
            return this.getters['userList']().then((userList) => {
                return {
                    header: ['id', 'Логин', 'Статус', 'Специализация', 'Кафедра', ''],
                    dataList: userList.map((user) => ({
                        data: [
                            user.id,
                            user.login,
                            this.getters['userStatus']()[user.status],
                            user.specializationName ? user.specializationName : '-',
                            user.departmentName ? user.departmentName : '-',
                            this.getters['userActions'](user.id)
                        ]
                    }))
                }
            })
        },

        'addUser': (user) => {
            return fetch('http://anketaback.vfbsac.by/user/add', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                new Data().mounted()
                response.json()
            })
        },

        'editUser': (user) => {
            return fetch('http://anketaback.vfbsac.by/user/edit', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                new Data().mounted()
                response.json()
            })
        },

        'deleteUser': (user) => {
            return fetch('http://anketaback.vfbsac.by/user/delete', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({id: user}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
        },

        'loginSelect': () => {
            return this.getters.userList().then((result) => {
                return {
                    placeholder: JSON.parse(localStorage.getItem('session')).status === 'departmentManager' ? 'Группа' : 'Логин',
                    inputId: 'login',
                    options: result.map((user) => {
                        if (JSON.parse(localStorage.getItem('session')).status === 'departmentManager'
                            && user.status === 'student'
                            || JSON.parse(localStorage.getItem('session')).status !== 'departmentManager') {
                            return {name: user.login, value: user.login}
                        }
                    }).filter((option) => option)
                }
            })
        }
    }
}
