import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class EmployeesService {

  constructor(private http: HttpClient) {}

  getEmployees(pageSize?: number, page?: number) {
    const queryParams = `?pagesize=${pageSize}&page=${page}`;
    return this.http.get<{employees: [], employeesCount: number}>(`http://localhost:3000/api/employees${queryParams}`);
  }

  addEmployee(employee) {
    return this.http.post<{employee: any, message: string}>('http://localhost:3000/api/employees', employee);
  }

  editEmployee(id: number, newEmployee) {
    return this.http.put<{message: string}>(`http://localhost:3000/api/employees/${id}`, newEmployee);
  }

  deleteEmployee(id: number) {
    return this.http.delete<{message: string}>(`http://localhost:3000/api/employees/${id}`);
  }
}
