import {Component, OnInit} from '@angular/core';
import {PuzzleService} from '../puzzle.service';
import {Router} from '@angular/router';
import {Stat} from '../Stat';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss']
})
export class EndScreenComponent implements OnInit {

  public stats: Stat[];
  public currentStat: Stat;

  constructor(public puzzleService: PuzzleService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.stats) {
      this.router.navigate(['puzzle/start']);
    } else {
    this.getStats();
    }
  }

  public restartPuzzle() {
    this.router.navigate(['puzzle/game']);
  }

  public startPuzzle() {
    this.router.navigate(['puzzle/start']);
  }

  private getStats() {
    this.stats = this.puzzleService.getStats();
    this.currentStat = this.stats[this.stats.length - 1];
    console.log(this.currentStat);
  }
}
