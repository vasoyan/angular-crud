import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IEmployee } from './interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'https://localhost:7018/api/Employees';

  constructor(private http: HttpClient) {}

  getEmployeeList(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.apiUrl).pipe(
      catchError((error) => {
        // Handle error
        console.error('Error fetching employee list:', error);
        throw error; // Rethrow or handle differently as per requirement
      })
    );
  }

  createEmployee(employee: IEmployee): Observable<any> {
    return this.http.post(this.apiUrl, employee).pipe(
      catchError((error) => {
        // Handle error
        console.error('Error creating employee:', error);
        throw error; // Rethrow or handle differently as per requirement
      })
    );
  }

  getEmployeeById(id: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        // Handle error
        console.error('Error fetching employee by ID:', error);
        throw error; // Rethrow or handle differently as per requirement
      })
    );
  }

  updateEmployee(id: number, employee: IEmployee): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, employee).pipe(
      catchError((error) => {
        // Handle error
        console.error('Error updating employee:', error);
        throw error; // Rethrow or handle differently as per requirement
      })
    );
  }

  deleteEmployeeById(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        // Handle error
        console.error('Error deleting employee by ID:', error);
        throw error; // Rethrow or handle differently as per requirement
      })
    );
  }
}
