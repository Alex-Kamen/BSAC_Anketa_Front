class Table {
    template(props) {
        return `
            <table>
                ${this.methods.renderHeader(props.header)}
                ${this.methods.renderData(props.dataList)}
            </table>
    `
    }

    methods = {
        renderHeader(headerList) {
            let header = '<tr class="table__header">'

            for (const headerCell of headerList) {
                header += `<th>${headerCell}</th>`;
            }

            header += '</tr>';

            return header;
        },

        renderData(data) {

            let dataTemplate = '';

            for (const row of data) {
                dataTemplate += '<tr class="table__body">';

                for (const cell of row.data) {
                    if (row.object && !cell.includes('div')) {
                        dataTemplate += `<td onclick="new List().methods.openAnswer(${row.object.id})">${cell}</td>`;
                    } else {
                        dataTemplate += `<td>${cell}</td>`;
                    }

                }

                dataTemplate += '</tr>';
            }

            return dataTemplate;
        }
    }
}
