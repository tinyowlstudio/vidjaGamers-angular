import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://vidjagamers-779c791eee4b.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
/**
* The functions included in this class all use API calls
*/
export class FetchApiDataService {
  /**
 * function to get token from local storage to pass to API
 */

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
* Inject the HttpClient module to the constructor params
* This will provide HttpClient to the entire class, making it available via this.http
*/

  constructor(private http: HttpClient) {
  }
  /**
   * User Registration
*/
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
 * User Login
*/
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
  * Get the whole games array with all the data
  */
  public getAllGames(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/games', { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get data from a single game
   */
  public getOneGame(gameTitle: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/games/' + gameTitle, { headers }).pipe(
      catchError(this.handleError)
    );
  }

    /**
   * Get genres of a single game
   * 
   * getting the game's genre data also uses this function because it's 
   * an array and the API only supports an API call to extract a single genre
   * using the :genre endpoint
   */
  public getGenres(gameTitle: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/games/' + gameTitle, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
  * Get developer data
  */
  public getDeveloper(developerName: string): Observable<any> {
    //console.log(userDetails);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/developer/' + developerName, { headers }).pipe(
      catchError(this.handleError)
    );
  }

    /**
  * Get logged in user data
  */
  public getUser(userName: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/users/' + userName, { headers }).pipe(
      catchError(this.handleError)
    );
  }
  /**
   * Get user's array of favorite games
   * 
  * Getting a user's favorite also doesn't have a special endpoint, so
  * we just use the same endpoint as getUser
  */
  public userFavorites(userName: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get(apiUrl + '/users/' + userName, { headers }).pipe(
      catchError(this.handleError)
    );
  }

    /**
  * Push new favorite game onto user's favorite game array
  */
  public addFavorite(userName: any, gameID: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    //POST needs a request body(?), so null has to be placed here to make it work 
    return this.http.post(apiUrl + '/users/' + userName + '/games/' + gameID, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

      /**
  * Delete new favorite game onto user's favorite game array
  */
  public deleteFavorite(userName: any, gameID: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.delete(apiUrl + '/users/' + userName + '/games/' + gameID, { headers }).pipe(
      catchError(this.handleError)
    );
  }

    /**
  * Edit user's data
  */
  public editUser(userName: any, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.put(apiUrl + '/users/' + userName, updatedData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

      /**
  * Delete user
  */
  public deleteUser(userName: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.delete(apiUrl + '/users/' + userName, { headers }).pipe(
      catchError(this.handleError)
    );
  }

      /**
  * Handle any errors if necessary
  */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else if (error.status === 200) { /** specifically for delete user since it would throw errors for HTTP200 for some reason */
      console.log('Success:', error.error.text);
      return (error.error.text); /** Return the success message */
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
  }



}