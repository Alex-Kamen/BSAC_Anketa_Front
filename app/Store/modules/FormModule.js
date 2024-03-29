class FormModule {
    getters = {
        'list': () => {
            const status = JSON.parse(localStorage.getItem('session')).status;

            return fetch('http://anketaback.vfbsac.by/form/list', {
                method: 'POST',
                body: JSON.stringify({status}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json());
        },

        'form': () => {
            let id = '';

            if (window.location.pathname.includes('/form/')) {
                id = window.location.pathname.replace('/form/', '');
            } else {
                id = window.location.pathname.replace('/formEdit/', '');
            }

            return fetch(`http://anketaback.vfbsac.by/form/${id}`).then(response => response.json());
        },

        'saveForm' : (data, recommendation) => {
            const id = window.location.pathname.replace('/form/', '');
            const login = JSON.parse(localStorage.getItem('session')).login;
            const specialization = JSON.parse(localStorage.getItem('session')).specialization;
            const tags = JSON.parse(localStorage.getItem('tags'));
            tags.push(['login', login]);
            tags.push(['formId', id]);

            if (JSON.parse(localStorage.getItem('session')).status === 'student') {
                tags.push(['specialization', specialization]);
            }

            let requestBody = {marks: data.marks, weights: data.weights, tags, recommendation, formId: id}

            return fetch('http://anketaback.vfbsac.by/form/save', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((responce) => responce.json())
        },

        'formSelect': () => {
            return this.getters['list']().then((result) => {
                return {
                    placeholder: 'Форма',
                    inputId: 'formId',
                    options: result.data.map((formItem) => ({name: formItem.name, value: formItem.id}))
                }
            })
        },

        'deleteAnswer': (id) => {
            return fetch('http://anketaback.vfbsac.by/answer/delete', {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({id: id}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => new List().methods.renderList())
        }
    }
}
