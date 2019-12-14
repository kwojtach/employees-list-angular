import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from './services/employees.service';
import {ToastsService} from './services/toasts.service';
import {ConfirmService} from './services/confirm-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('manageEmployeeSidebar', {static: false}) manageEmployeeSidebar;
  employeeForm: FormGroup;
  isEditing = false;
  editingId: number;
  isLoading = false;
  employeesCount: number;
  page = 1;
  employees = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    private toastsService: ToastsService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.getEmployees(5, 1);

    this.employeeForm = this.formBuilder.group({
      firstname: ['', Validators.required, {updateOn: 'submit'}],
      surname: ['', Validators.required, {updateOn: 'submit'}],
      email: ['', [Validators.required, Validators.email], {updateOn: 'submit'}],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^-?([0-9]\d*)?$/)], {updateOn: 'submit'}]
    });
  }

  pageChange(page) {
    this.page = page;
    this.getEmployees(5, page);
  }

  getEmployees(pageSize?: number, page?: number) {
    this.isLoading = true;
    this.employeesService.getEmployees(pageSize, page)
      .subscribe(res => {
        this.isLoading = false;
        this.employees = res.employees;
        this.employeesCount = res.employeesCount;
      }, error => {
        this.isLoading = false;
        this.toastsService.show(false, 'wystąpił błąd, lista pracowników nie została pobrana', false);
      });
  }

  onStartManageEmployee(isEditing: boolean, employee?) {
    this.isEditing = isEditing;
    if (this.isEditing) {
      this.editingId = employee._id;
      this.employeeForm.patchValue(employee);
    }
    this.manageEmployeeSidebar.open()
      .then(() => {
        this.isEditing = false;
        this.editingId = null;
        this.employeeForm.reset();
      });
  }

  onDeleteEmployee(employee) {
    this.confirmService.confirm({
      title: 'usuwanie pracownika',
      message: `Czy jesteś pewien, że chcesz usunąć pracownika ${employee.firstname} ${employee.surname}?`
    }).then(() => {
      this.employeesService.deleteEmployee(employee._id)
        .subscribe(res => {
          this.toastsService.show(true, 'pracownik został usunięty pomyślnie', false);
          this.getEmployees(5, 1);
        }, error => {
          this.toastsService.show(false, 'wystąpił błąd, pracownik nie został usunięty', false);
        });
    }, () => {});
  }

  onManageEmployee() {
    if (this.employeeForm.valid) {
      if (this.isEditing) {
        this.employeesService.editEmployee(this.editingId, this.employeeForm.value)
          .subscribe(res => {
            this.toastsService.show(true, 'dane pracownika zostały zaktualizowane pomyślnie', false);
            this.getEmployees(5, 1);
            this.manageEmployeeSidebar.close();
          }, error => {
            this.toastsService.show(false, 'wystąpił błąd, dane pracownika nie zostały zaktualizowane', false);
          });
      } else {
        this.employeesService.addEmployee(this.employeeForm.value)
          .subscribe(res => {
            this.toastsService.show(true, 'pracownik został dodany pomyślnie', false);
            this.getEmployees(5, 1);
            this.manageEmployeeSidebar.close();
          }, error => {
            this.toastsService.show(false, 'wystąpił błąd, pracownik nie został dodany', false);
          });
      }
    }
  }
}
