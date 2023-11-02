import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

/**
 * The welcome page stores two toher components
 * User Registration and User Login
 */
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) { }
  /** If there's a user already stored in local storage, redirect to home page (games) */
  ngOnInit(): void {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      this.router.navigate(['games']);
    }
  }
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }
openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}