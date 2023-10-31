import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://vidjagamers-779c791eee4b.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // function to get token from local storage to pass to API
  getToken(): string | null {
    return localStorage.getItem('token');
  }

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
    //console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getAllGames(): Observable<any> {
    //console.log(userDetails);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/games', { headers }).pipe(
      catchError(this.handleError)
    );
  }

      //normally, to get a single genre we would do this, but games can have multiple,
      //so we have to extract genre array from just the game
  public getOneGame(gameTitle: any): Observable<any> {
    //console.log(userDetails);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/games/' + gameTitle, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  // public getGenre(genreName: any): Observable<any> {
  //   //console.log(userDetails);
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${this.getToken()}`
  //   });
  //   return this.http.get(apiUrl + '/genre/' + genreName, { headers }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  public getDeveloper(developerName: string): Observable<any> {
    //console.log(userDetails);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/developer/' +  developerName , { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public getUser(userName: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/users/' + userName, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  //Info obtained when getting user, no special endpoint for getting all user favorites
  public userFavorites(userName: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/users/' + userName, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public addFavorite(userName: any, gameID: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    //POST needs a request body(?), so null has to be placed here to make it work 
    return this.http.post(apiUrl + '/users/' + userName + '/games/' + gameID, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteFavorite(userName: any, gameID: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.delete(apiUrl + '/users/'+ userName + '/games/' + gameID, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public editUser(userName: any, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.put(apiUrl + '/users/' + userName, updatedData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUser(userName: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.delete(apiUrl + '/users/' + userName, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else if (error.status === 200) { //specifically for delete user since it would throw errors for HTTP200 for some reason
      console.log('Success:', error.error.text);
      return (error.error.text); // Return the success message
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }
  
  
  
}