import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';

import { DeveloperDialogComponent } from '../developer-dialog/developer-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';

import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
/**
 * Shows the data of the games and their favorite status
 */
export class GameCardComponent {
  games: any[] = [];
  username: string = "";
  favorites: any[] = []; /** favorites are only stored as an array of "_id"s */
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private router: Router) { }

  /** If there's no user on initialization, it redirects to the welcome page */
ngOnInit(): void {
  const storedUserData = localStorage.getItem("user");
  if (!storedUserData) {
    this.router.navigate(['welcome']);
  } else {
    this.username = JSON.parse(storedUserData).username;
  }
  this.getGames();
  this.getFavorites();
}

/** Gets the array of games on the API and stores it in games */
getGames(): void {
  this.fetchApiData.getAllGames().subscribe((resp: any) => {
      this.games = resp;
      console.log(this.games);
    });
  }

  /** Gets the favoriteGames array stored on the user API and stores it in the favorites array */
  getFavorites(): void{
    this.fetchApiData.userFavorites(this.username).subscribe((resp: any) => {
      this.favorites = resp.favoriteGames;
    });
  }

  /**
 * This specific function is to check if the game is favorited
 * Depending on its result, the addFavorite/deleteFavorite button 
 * will show
 */
  isFavorite(game: any): boolean {
    return this.favorites.some((favoriteGameId: any) => favoriteGameId === game._id);
  }

   /** Pushes new favorite game onto the user's API and the favorites array */
  addFavorite(gameID: any): void{
    this.fetchApiData.addFavorite(this.username, gameID).subscribe((resp: any) => {
      /**
       * update with new favorites array
       * this needs to use resp.favorites because the API function returns all user data
       */
      this.favorites = resp.favoriteGames; 
    });
  }

  /** Deletes the favorite game onto the user's API and the favorites array */
  deleteFavorite(gameID: any): void{
    this.fetchApiData.deleteFavorite(this.username, gameID).subscribe((resp: any) => {
            /**
       * update with new favorites array
       * this needs to use resp.favorites because the API function returns all user data
       */
      this.favorites = resp.favoriteGames; 
    });
  }

/** Shows developer info */
  openDeveloperDialog(developerName: string): void {
    this.fetchApiData.getDeveloper(developerName).subscribe((developer: any) => {
      this.dialog.open(DeveloperDialogComponent, {
        width: '400px',
        data: { developer: developer } /** developer object from API is passed through */
      });
    });
    
  }

  /** Shows genre info - note that this is an array of objects */
  openGenreDialog(gameTitle: string): void {
    this.fetchApiData.getGenres(gameTitle).subscribe((game: any) => {
      this.dialog.open(GenreDialogComponent, {
        width: '400px',
        data: { game: game } /** passing the whole game object through */
      });
    });
    
  }

  /** Shows description of the game */
  openDescriptionDialog(gameTitle: string): void {
    this.fetchApiData.getOneGame(gameTitle).subscribe((game: any) => {
      this.dialog.open(DescriptionDialogComponent, {
        width: '400px',
        data: { game: game } /** passing the whole game object through */
      });
      console.log(game);
    });
    
  }

/** Route to profile view */
  profileView(): void {
    this.router.navigate(['profile']);
  }

  /** Sign out the user, clear local storage and redirect to the welcome page */
  signoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
  
}