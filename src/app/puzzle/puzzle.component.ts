import {Component, OnInit} from '@angular/core';
import {PuzzleService} from './puzzle.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {

  constructor(public puzzleService: PuzzleService,
              private router: Router) {

  }

  ngOnInit() {
    this.router.navigate(['puzzle/start']);
  }
}
