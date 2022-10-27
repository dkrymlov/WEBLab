import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-game',
  templateUrl: './btn-game.component.html',
  styleUrls: ['./btn-game.component.scss']
})
export class BtnGameComponent implements OnInit {

  y : string;
  x : string;

  constructor() {
    this.y = 323 + 'px'
    this.x = 880 + 'px'
  }

  ngOnInit(): void {
  }

  changePosition() {
    let max = 800;
    let min = 200;
    this.y = (Math.floor(Math.random() * (max - min + 1)) + min) + 'px';
    this.x = (Math.floor(Math.random() * (max - min + 1)) + min) + 'px';
  }

  loseAlert() {
    alert("Better luck next time :)")
    this.y = 323 + 'px'
    this.x = 880 + 'px'
  }
}
