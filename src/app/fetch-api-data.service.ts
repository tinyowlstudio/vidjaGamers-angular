import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://vidjagamers-779c791eee4b.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getAllGames(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + '/games', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getOneGame(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + '/games/:title', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getDeveloper(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + '/developer/:developerName', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getGenre(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + '/genre/:genreName', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + '/users/:username', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //Info obtained when getting user, no special endpoint for getting all user favorites
  public userFavorites(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.get(apiUrl + '/users/:username', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public addFavorite(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users/:username/games/:gameID', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public deleteFavorite(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.delete(apiUrl + '/users/:username/games/:gameID', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.put(apiUrl + '/users/:username', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.delete(apiUrl + '/users/:username', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }
}