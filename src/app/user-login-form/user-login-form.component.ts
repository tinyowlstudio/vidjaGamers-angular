import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})

/**
 * This is the dialog for user login
 */
export class UserLoginFormComponent implements OnInit {

  /** this will store the username and password from the input fields */
  @Input() userData = { username: '', password: ''};

  
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar, 
    private router: Router
    ) { }
  ngOnInit(): void {
  }

/** log in the user */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({ 
      next: (result) => {
        /** store data on success */
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        /** Close dialog on success and give confirmation */
        this.dialogRef.close();
        console.log("login successful");
        this.snackBar.open( 'Login Successful!',"OK", {
          duration: 2000
        });
        this.router.navigate(['games']);
      },
      /** If there's an issue, there will be a pop up */
      error: (result) => {
        console.log(result);
        this.snackBar.open("Unable to Login", 'OK', {
          duration: 2000
        });
      }
    });
  }

  }