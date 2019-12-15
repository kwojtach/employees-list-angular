const Employee = require('../models/employee');

exports.getEmployees = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const page = +req.query.page;
  const employeeFind = Employee.find();
  let fetchedEmployees;
  if (pageSize && page) {
    employeeFind.skip(pageSize * (page - 1)).limit(pageSize);
  }
  employeeFind.find()
    .then(employees => {
      fetchedEmployees = employees;
      return Employee.count();
    })
    .then(count => {
      res.status(200).json({
        employees: fetchedEmployees,
        employeesCount: count
      });
    })
    .catch(error => res.status(500).json({ message: 'Fething employees failed' }));
};

exports.addEmployee = (req, res, next) => {
  const employee = new Employee({
    firstname: req.body.firstname,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone
  });
  employee.save()
    .then(addedEmployee => {
      res.status(201).json({
        message: 'Employee added successfully',
        employee: addedEmployee
      });
    })
    .catch(error => res.status(500).json({ message: 'Adding employee failed' }));
};

exports.editEmployee = (req, res, next) => {
  const employee = new Employee({
    _id: req.params.id,
    firstname: req.body.firstname,
    surname: req.body.surname,
    email: req.body.email,
    phone: req.body.phone
  });
  Employee.updateOne({ _id: req.params.id }, employee)
    .then(response => res.status(200).json({ message: 'Employee edited successfully' }))
    .catch(error => res.status(500).json({ message: 'Editing employee failed' }));
};

exports.deleteEmployee = (req, res, next) => {
  Employee.deleteOne({ _id: req.params.id })
    .then(response => {
      res.status(200).json({ message: 'Employee deleted successfully' });
    })
    .catch(error => res.status(500).json({ message: "Deleting employee failed" }));
};
