import { Component, inject } from '@angular/core';
import { IEmployee } from '../../interfaces/employee';
import { HttpService } from '../../http.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employeeList: IEmployee[] = [];
  router = inject(Router);
  toaster = inject(ToastrService);

  displayedColumns: string[] = [
    'action',
    'id',
    'name',
    'email',
    'mobile',
    'salary',
    'department',
  ];

  httpService = inject(HttpService);

  ngOnInit() {
    this.httpService.getEmployeeList().subscribe((result) => {
      this.employeeList = result;
      console.log(this.employeeList);
    });
  }

  onEdit(id: number) {
    this.router.navigateByUrl('/employee/' + id);
  }

  onDelete(id: number) {
    this.httpService.deleteEmployeeById(id).subscribe(() => {
      console.log('Delete Success!');
      this.toaster.success('Employee deleted Successfully!');
      this.employeeList = this.employeeList.filter((x) => x.id != id);
    });
  }
}
