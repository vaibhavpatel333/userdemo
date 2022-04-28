import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserList } from 'src/app/interfaces/global.interface';
import { UsersService } from '../../services/users.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  addressFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.required]);
  companyFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  userId: string;

  constructor(private route: ActivatedRoute, private service: UsersService, private router: Router) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.service.getUsersById(this.userId).subscribe((response: UserList[]) => {
      if (response) {
        this.nameFormControl.setValue(response[0]?.name);
        this.emailFormControl.setValue(response[0]?.email);
        this.addressFormControl.setValue(response[0]?.address?.city);
        this.phoneFormControl.setValue(response[0]?.phone);
        this.companyFormControl.setValue(response[0]?.company.name);
      }
    });
  }

  onEditClick(): void {
    this.router.navigate(['/users']);
  }

}
