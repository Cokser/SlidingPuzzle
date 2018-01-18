import {Component, OnInit} from '@angular/core';
import {PuzzleService} from './puzzle.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {

  // public clicked: boolean;
  public puzzleSize: number[] = [];
  public gameStarted = false;
  public currentScore = 0;

  constructor(public puzzleService: PuzzleService,
              private router: Router) {

  }

  ngOnInit() {
    // this.router.navigate(['puzzle/start']);
    // this.getCurrentScore();
  }
  //
  // public getCurrentScore() {
  //   // this.currentScore = this.game.ticks;
  //   this.subscription = this.game.timer.subscribe(t => this.tickerFunc(t));
  //
  // }
  //
  // public tickerFunc(tick) {
  //   this.currentScore = tick;
  //   // this.puzzleService.saveScore(tick);
  //   console.log(this.game.ticks);
  // }
}
