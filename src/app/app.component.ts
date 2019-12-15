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
  isFetchingEmployeesLoading = false;
  isManagingEmployeeLoading = false;
  employeesCount: number;
  page = 1;
  pageSize = 5;
  isSubmitted = false;
  private editingId: number;

  employees = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    private toastsService: ToastsService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.getEmployees(this.pageSize, 1);

    this.employeeForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^-?([0-9]\d*)?$/)]]
    });
  }

  pageChange(page) {
    this.page = page;
    this.getEmployees(this.pageSize, page);
  }

  onChangePageSize(event) {
    this.pageSize = +event.target.value;
    this.getEmployees(this.pageSize, 1);
  }

  getEmployees(pageSize?: number, page?: number) {
    this.isFetchingEmployeesLoading = true;
    this.employeesService.getEmployees(pageSize, page)
      .subscribe(res => {
        this.isFetchingEmployeesLoading = false;
        this.employees = res.employees;
        this.employeesCount = res.employeesCount;
      }, error => {
        this.isFetchingEmployeesLoading = false;
        this.toastsService.show(false, 'wystąpił błąd, lista pracowników nie została pobrana', true);
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
        this.isSubmitted = false;
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
          this.toastsService.show(true, 'pracownik został usunięty pomyślnie', true);
          this.getEmployees(this.pageSize, 1);
        }, error => {
          this.toastsService.show(false, 'wystąpił błąd, pracownik nie został usunięty', true);
        });
    }, () => {});
  }

  onManageEmployee() {
    this.isSubmitted = true;
    if (this.employeeForm.valid) {
      this.isManagingEmployeeLoading = true;
      if (this.isEditing) {
        this.employeesService.editEmployee(this.editingId, this.employeeForm.value)
          .subscribe(res => {
            this.toastsService.show(true, 'dane pracownika zostały zaktualizowane pomyślnie', true);
            this.getEmployees(this.pageSize, 1);
            this.manageEmployeeSidebar.close();
            this.isManagingEmployeeLoading = false;
          }, error => {
            this.toastsService.show(false, 'wystąpił błąd, dane pracownika nie zostały zaktualizowane', true);
            this.isManagingEmployeeLoading = false;
          });
      } else {
        this.employeesService.addEmployee(this.employeeForm.value)
          .subscribe(res => {
            this.toastsService.show(true, 'pracownik został dodany pomyślnie', true);
            this.getEmployees(this.pageSize, 1);
            this.manageEmployeeSidebar.close();
            this.isManagingEmployeeLoading = false;
          }, error => {
            this.toastsService.show(false, 'wystąpił błąd, pracownik nie został dodany', true);
            this.isManagingEmployeeLoading = false;
          });
      }
    }
  }
}
