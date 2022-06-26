class SettingsModule {
    getters = {
        'employeeTypeSelect': () => {
            return {
                placeholder: 'Тип персонала',
                inputId: 'employeeType',
                options: [
                    {value: 'АУП', name: 'АУП'},
                    {value: 'ППС', name: 'ППС'},
                    {value: 'УВП', name: 'УВП'},
                    {value: 'ПОП', name: 'ПОП'},
                ]
            }
        },

        'educationTypeSelect': () => {
            return {
                placeholder: 'Тип получения образования',
                inputId: 'educationType',
                options: [
                    {value: 'ДФПО', name: 'ДФПО'},
                    {value: 'ЗФПО', name: 'ЗФПО'},
                ]
            }
        },

        'ageSelect': () => {
            return {
                placeholder: 'Возрастная категория',
                inputId: 'age',
                options: [
                    {value: 'до 35 лет', name: 'до 35 лет'},
                    {value: 'от 35 до 55 лет', name: 'от 35 до 55 лет'},
                    {value: 'старше 55 лет', name: 'старше 55 лет'},
                ]
            }
        },
    }
}
