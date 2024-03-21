import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../../http.service';
import { IEmployee } from '../../interfaces/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.css',
})
export class EmployeeAddComponent {
  formBuiler = inject(FormBuilder);
  httpService = inject(HttpService);
  router = inject(Router);
  activeRouter = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  isEdit = false;
  id!: number;

  employeeForm = this.formBuiler.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
    salary: [0, [Validators.required]],
    department: ['select', [Validators.required]],
  });

  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.params['id'];

    if (this.id) {
      this.isEdit = true;
      this.httpService.getEmployeeById(this.id).subscribe((data) => {
        console.log(data);
        this.employeeForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    const employee: IEmployee = {
      id: this.isEdit && this.id > 0 ? this.id : 0,
      name: this.employeeForm.value.name!,
      email: this.employeeForm.value.email!,
      mobile: this.employeeForm.value.mobile!,
      salary: this.employeeForm.value.salary!,
      department: this.employeeForm.value.department!,
    };

    if (this.isEdit && this.id > 0) {
      console.log(employee);
      this.httpService.updateEmployee(this.id, employee).subscribe(() => {
        console.log(employee);
        this.toaster.success('Employee updated Successfully!');
        this.router.navigateByUrl('/employee-list');
      });
    } else {
      console.log('Submit button Click', this.employeeForm.value);
      this.httpService.createEmployee(employee).subscribe(() => {
        console.log('Create Success!');
        this.toaster.success('Employee created Successfully!');
        this.router.navigateByUrl('/employee-list');
      });
    }
  }
}
