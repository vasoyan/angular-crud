import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  apiUrl = 'https://localhost:7018';
  http = inject(HttpClient);

  constructor() {}

  getEmployeeList() {
    return this.http.get<IEmployee[]>(`${this.apiUrl}/api/Employees`);
  }

  createEmployee(employee: IEmployee) {
    return this.http.post(`${this.apiUrl}/api/Employees`, employee);
  }

  getEmployeeById(id: number) {
    return this.http.get<IEmployee>(`${this.apiUrl}/api/Employees/${id}`);
  }

  updateEmployee(id: number, employee: IEmployee) {
    return this.http.put(`${this.apiUrl}/api/Employees/${id}`, employee);
  }

  deleteEmployeeById(id: number) {
    return this.http.delete(`${this.apiUrl}/api/Employees/${id}`);
  }
}
