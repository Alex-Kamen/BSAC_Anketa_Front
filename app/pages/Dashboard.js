class Dashboard {
    template() {
        return `${new Header().template()}
                ${new SubHeader().template()}
                <div class="diogram">
                    <div class="container">
                        <div class="filter__button report"><img src="http://anketaback.vfbsac.by/static/img/file.png" alt="report" onclick="new Dashboard().methods.report()"></div>
                        ${new Filter().template()}
                        ${new FilterData().template()}
                        <div class="diogram__list">
                            <div class="diogram__item">
                                <div class="diogram__content">
                                    <div class="diogram__table">
                                       
                                    </div>
                                    <canvas width="700" height="500"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            `
    }

    mounted() {
        this.methods.renderDiagram();
        new Filter().mounted();
        new FilterData().mounted()
    }

    methods = {
        report() {
            new Store().modules.answer.getters.report();
        },

        renderDiagram() {
            new Store().modules.answer.getters.answer().then((response) => {
                document.querySelector('.diogram__table').innerHTML = new Table().template(this.getTableData(response));

                let cvs = document.querySelector("canvas");

                let ctx = cvs.getContext("2d");

                ctx.fillStyle = "black";
                ctx.lineWidth = 2.0;
                ctx.beginPath();
                ctx.moveTo(30, 10);
                ctx.lineTo(30, 460);
                ctx.lineTo(680, 460);
                ctx.stroke();
                ctx.fillStyle = "black";

                // Цикл для отображения значений по Y
                for(let i = 0; i < 6; i++) {
                    ctx.fillText((5 - i) * 20 + "", 4, i * 80 + 60);
                    ctx.beginPath();
                    ctx.moveTo(25, i * 80+60);
                    ctx.lineTo(30, i * 80+60);
                    ctx.stroke();
                }

                let blockSize = 640 / response.resultList.length;

                // Выводим меток
                for(let i = 0; i < response.resultList.length; i++) {
                    ctx.fillText(i + 1, 30 + i * blockSize + blockSize / 2, 475);
                }

                // Цикл для от рисовки графиков
                for(let i = 0; i < response.resultList.length; i++) {
                    let dp = +response.resultList[i];

                    if(dp > 50) {
                        let color = Math.round(255 * (dp - 50) / 50);
                        ctx.fillStyle = `rgb(${255 - color}, 255, 0)`;
                    } else if (dp < 50) {
                        let color = Math.round(255 * dp / 50)
                        ctx.fillStyle = `rgb(255, ${color}, 0)`;
                    } else {
                        ctx.fillStyle = `rgb(255, 255, 0)`;
                    }

                    ctx.fillRect(40 + i * blockSize, 460 - dp * 4, blockSize - 10, dp * 4);
                }
            })
        },

        getTableData(data) {
            let header = ['№', 'Вопрос', 'Результат'];
            let dataList = [];

            for (let result = 0; result < data.resultList.length; result++) {
                dataList.push({data: [
                    result+1,
                    data.formData.questionList[result][1],
                    `${data.resultList[result]}±${data.resultErrorList[result]}%`
                ]});
            }

            dataList.push({data:[
                data.resultList.length + 1,
                'Итого',
                `${data.mainResult}±${data.mainResultError}%`
            ]});

            return {header, dataList}
        }
    }
}
