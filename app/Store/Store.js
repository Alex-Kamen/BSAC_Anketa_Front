class Store {
    modules = {
        user: new UserModule(),
        form: new FormModule(),
        answer: new AnswerModule(),
        department: new DepartmentModule(),
        speciality: new SpecialityModule(),
        discipline: new DisciplineModule(),
        specialization: new SpecializationModule(),
        settings: new SettingsModule()
    }
}
