import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserList } from 'src/app/interfaces/global.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'address',
    'phone',
    'company',
    'action'
  ];
  
  dataSource!: UserList[];
  constructor(private service: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getUsersList().subscribe((response) => {
      this.dataSource = response;
    });
  }
  onRowClicked(row: any) {
    this.router.navigate(['/user-detail', row.id]);
  }
}
