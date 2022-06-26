const routes = new Map([
    [/\/data/, new Data()],
    [/\/dashboard/, new Dashboard()],
    [/\/list/, new List()],
    [/\/formList/, new FormList()],
    [/\/form\/\d/, new Form()],
    [/\/formEdit\/\d/, new FormEditor()],
    [/\//, new Auth()],
]);
