class AnswerModule {
    getters = {
        'answer': () => {
            return fetch(`http://anketaback.vfbsac.by/answer/data${window.location.search}`).then(response => response.json());
        },

        'list': () => {
            return fetch(`http://anketaback.vfbsac.by/answer/list${window.location.search}`).then(response => response.json());
        },

        'report': () => {
            const link = document.createElement('a');
            link.href = `http://anketaback.vfbsac.by/report${window.location.search}`;
            link.download = `report`;

            document.body.appendChild(link);

            link.click();
            link.remove()
        }
    }
}
