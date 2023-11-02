import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})

/**
 * Displays the user's info and allows them to edit their
 * information or delete their user
 */
export class ProfileViewComponent {
  /** user will store whatever is in local storage */
  user: { username: string, password: string, email: string, birthday: string } = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };

  /** userData stores the information that is passed through to the form */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private router: Router, public snackBar: MatSnackBar) { }

  /** If there's no user on initialization, it redirects to the welcome page */
  ngOnInit(): void {
    const storedUserData = localStorage.getItem("user");
    if (!storedUserData) {
      this.router.navigate(['welcome']);
    } else {
      this.user = JSON.parse(storedUserData);
    }
  }

  /** Reroute back to games view */
  gameView(): void{
    this.router.navigate(['games']);
  }

  /** Sign a user out and empty local storage */
  signoutUser(): void {
    localStorage.clear();
    this.snackBar.open( 'Signed out',"OK", {
      duration: 2000
    });
    this.router.navigate(['welcome']);
  }

  /** 
   * Edit user's info 
   * 
   * This edits info both on the database and local storage
   * */
  editUser(): void {
    /** 
     * updatedData stores any new changes from userData
     * 
     * If there are any empty fields, the updatedData fields
     * that were empty will be replaced with what's currently
     * in userData instead
     * */
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

     /** 
      * updatedData is passed through to editUser since it's the body that the API requires 
      * so that it can update
     */
    this.fetchApiData.editUser(this.user.username, updatedData).subscribe((resp: any) => {
      this.user = resp;
      this.snackBar.open('Info Updated',"OK", {
        duration: 2000
      });
      localStorage.setItem("user", JSON.stringify(this.user));
      return this.user;
    });
  }

  /** Delete user from database and clear local storage */
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user.username).subscribe((resp: any) => {

      localStorage.clear();
      this.snackBar.open( 'User deleted',"OK", {
        duration: 2000
      });
      /** redirect back to the welcome page */
      this.router.navigate(['welcome']);
    });
  }
}
