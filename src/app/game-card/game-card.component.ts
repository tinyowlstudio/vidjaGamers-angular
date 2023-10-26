import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  games: any[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

ngOnInit(): void {
  this.getGames();
}

getGames(): void {
  this.fetchApiData.getAllGames().subscribe((resp: any) => {
      this.games = resp;
      console.log(this.games);
      return this.games;
    });
  }
}