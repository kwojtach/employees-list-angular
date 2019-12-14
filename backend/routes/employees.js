const express = require('express');

const EmployeeController = require('../controllers/employees');

const router = express.Router();

router.get('', EmployeeController.getEmployees);

router.post('', EmployeeController.addEmployee);

router.put('/:id', EmployeeController.editEmployee);

router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;
