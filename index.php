<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Анкетирование</title>
	<link rel="shortcut icon" href="http://anketaback.vfbsac.by/static/img/bsac_logo.ico" type="image/x-icon">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/style.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/Auth.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/input.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/FormItem.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/Select.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/QuestionList.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/Filter.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/Table.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/Modal.css?<?php echo time();?>">
	<link rel="stylesheet" type="text/css" href="http://anketa.vfbsac.by/app/static/css/Data.css?<?php echo time();?>">
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/modules/AnswerModule.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/modules/FormModule.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/modules/UserModule.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/modules/DepartmentModule.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/modules/SpecialityModule.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/modules/DisciplineModule.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/modules/SpecializationModule.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/modules/SettingsModule.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Store/Store.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Router/Router.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/pages/List.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/pages/Auth.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/pages/FormList.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/pages/Form.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/pages/Data.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/pages/Dashboard.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/table/Table.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/Header.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/SubHeader.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/questionTypes/TextArea.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/questionTypes/QuestionInput.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/questionTypes/Checkbox.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/QuestionItem.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/inputs/Select.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/inputs/Input.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/FormItem.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/Filter.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/forms/DepartmentForm.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/forms/SpecialityForm.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/forms/SpecializationForm.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/forms/UserForm.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/forms/DisciplineForm.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/AddDepartmentModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/EditDepartmentModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/DeleteDepartmentModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/AddDisciplineModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/EditDisciplineModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/DeleteDisciplineModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/AddSpecialityModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/EditSpecialityModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/DeleteSpecialityModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/AddUserModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/EditUserModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/DeleteUserModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/AddSpecializationModal.js?<?php echo time();?>"></script>
    <script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/EditSpecializationModal.js?<?php echo time();?>"></script>
    <script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/DeleteSpecializationModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/DataModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Components/modals/DeleteAnswerModal.js?<?php echo time();?>"></script>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/Router/routes.js?<?php echo time();?>"></script>
</head>
<body>
	<div class="wrapper">
		<div class="content">
			<div id="app">

			</div>
		</div>
		<div class="footer">
			<div class="container">
				<div class="footer__inner">
					<p class="footer__text">Витебский филиал УО Белорусская государственная академия связи</p>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="http://anketa.vfbsac.by/app/index.js?<?php echo time();?>"></script>
</body>
</html>
