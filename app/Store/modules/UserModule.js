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
                    header: ['id', 'Логин', 'Статус', 'Специализация', ''],
                    dataList: userList.map((user) => ({
                        data: [
                            user.id,
                            user.login,
                            this.getters['userStatus']()[user.status],
                            user.specializationName ? user.specializationName : '',
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
            }).then(() => new Data().mounted())
        },

        'editUser': (user) => {
            return fetch('http://anketaback.vfbsac.by/user/edit', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new Data().mounted())
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
                    placeholder: 'Логин',
                    inputId: 'login',
                    options: result.map((user) => ({name: user.login, value: user.login}))
                }
            })
        }
    }
}
