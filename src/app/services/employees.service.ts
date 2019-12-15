import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EmployeesService {

  constructor(private http: HttpClient) {}

  getEmployees(pageSize?: number, page?: number) {
    const queryParams = `?pagesize=${pageSize}&page=${page}`;
    return this.http.get<{employees: [], employeesCount: number}>(`https://employees-list-angular.herokuapp.com/api/employees${queryParams}`);
  }

  addEmployee(employee) {
    return this.http.post<{employee: any, message: string}>('https://employees-list-angular.herokuapp.com/api/employees', employee);
  }

  editEmployee(id: number, newEmployee) {
    return this.http.put<{message: string}>(`https://employees-list-angular.herokuapp.com/api/employees/${id}`, newEmployee);
  }

  deleteEmployee(id: number) {
    return this.http.delete<{message: string}>(`https://employees-list-angular.herokuapp.com/api/employees/${id}`);
  }
}
