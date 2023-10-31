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
export class GameCardComponent {
  games: any[] = [];
  user: { username: string, password: string, email: string, birthday: string } = {
    username: '',
    password: '',
    email: '',
    birthday: '',
  };
  favorites: any[] = []; //favorites are only stored as an array of "_id"s
  constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, private router: Router) { }

ngOnInit(): void {
  const storedUserData = localStorage.getItem("user");
  if (!storedUserData) {
    this.router.navigate(['welcome']);
  } else {
    this.user = JSON.parse(storedUserData);
  }
  this.getGames();
  this.getFavorites();
}

getGames(): void {
  this.fetchApiData.getAllGames().subscribe((resp: any) => {
      this.games = resp;
      console.log(this.games);
    });
  }

  getFavorites(): void{
    this.fetchApiData.userFavorites(this.user.username).subscribe((resp: any) => {
      this.favorites = resp.favoriteGames;
    });
  }

  isFavorite(game: any): boolean {
    return this.favorites.some((favoriteGameId: any) => favoriteGameId === game._id);
  }

  addFavorite(gameID: any): void{
    this.fetchApiData.addFavorite(this.user.username, gameID).subscribe((resp: any) => {
      //update with new favorites array
      //this needs to use resp.favorites because the API function returns all user data
      this.favorites = resp.favoriteGames; 
    });
  }

  deleteFavorite(gameID: any): void{
    this.fetchApiData.deleteFavorite(this.user.username, gameID).subscribe((resp: any) => {
      //update with new favorites array
      this.favorites = resp.favoriteGames; 
    });
  }


  openDeveloperDialog(developerName: string): void {
    this.fetchApiData.getDeveloper(developerName).subscribe((developer: any) => {
      this.dialog.open(DeveloperDialogComponent, {
        width: '400px',
        data: { developer: developer } //developer object from API is passed through
      });
    });
    
  }

  openGenreDialog(gameTitle: string): void {
    this.fetchApiData.getOneGame(gameTitle).subscribe((game: any) => {
      this.dialog.open(GenreDialogComponent, {
        width: '400px',
        data: { game: game } //passing the whole game object through
      });
    });
    
  }

  openDescriptionDialog(gameTitle: string): void {
    this.fetchApiData.getOneGame(gameTitle).subscribe((game: any) => {
      this.dialog.open(DescriptionDialogComponent, {
        width: '400px',
        data: { game: game } //passing the whole game objec tthrough
      });
      console.log(game);
    });
    
  }

  profileView(): void {
    this.router.navigate(['profile']);
  }

  signoutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
  
}