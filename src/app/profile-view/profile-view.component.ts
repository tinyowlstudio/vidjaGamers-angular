import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {
  user: { username: string, password: string, email: string, birthday: string } = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };
  @Input() userData = { username: '', password: '', email: '', birthday: '' };
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem("user");
    if (!storedUserData) {
      this.router.navigate(['welcome']);
    } else {
      this.user = JSON.parse(storedUserData);
    }
  }

  gameView(): void{
    this.router.navigate(['games']);
  }

  signoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  editUser(): void {
    //make a copy to remove fields that werent updated
    const updatedData: any = {};
    if (this.userData.username !== '') {
      updatedData.username = this.userData.username;
    }
    if (this.userData.password !== '') {
      updatedData.password = this.userData.password;
    }
    if (this.userData.email !== '') {
      updatedData.email = this.userData.email;
    }
    if (this.userData.birthday !== '') {
      updatedData.birthday = this.userData.birthday;
    }

    this.fetchApiData.editUser(this.user.username, updatedData).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      localStorage.setItem("user", JSON.stringify(this.user));
      return this.user;
    });
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user.username).subscribe((resp: any) => {
      localStorage.clear();
      this.router.navigate(['welcome']);
    });
  }
}
