import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

/**
 * This is the dialog for user registration
 */
export class UserRegistrationFormComponent implements OnInit {

  /** 
   * This will store the information from the input fields 
   * and pass it to userRegistration
  */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /** Register the user */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        this.dialogRef.close();
        console.log("sign up successful");
        this.snackBar.open("Signup Successful!", 'OK', {
          duration: 2000
        });
      },
      error: (result) => {
        console.log(result);
        this.snackBar.open("Unable to signup", 'OK', {
          duration: 2000
        });
      }
    });
  }
}