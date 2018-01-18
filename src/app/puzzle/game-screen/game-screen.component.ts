import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {Subscription} from 'rxjs/Subscription';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {PuzzleService} from '../puzzle.service';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss']
})
export class GameScreenComponent implements OnInit, OnDestroy {

  public timer = null;
  public voidElem = null;
  public shufflingFlag = false;
  public rows = 0;
  public cols = 0;
  public ticks = 0;
  public steps = 0;
  public itemsArray: any[] = [];
  public sortedArray: any[] = [];
  public puzzleState: any[] = [];
  public puzzleSize: number[] = [];
  public switchedElements: any[] = [];
  private subscription: Subscription;

  constructor(public puzzleService: PuzzleService,
              private router: Router) {

    if (!this.puzzleService.puzzleSize.length || this.subscription) {
      this.router.navigate(['puzzle/start']);
    }
  }

  ngOnInit() {

    this.puzzleSize = this.puzzleService.puzzleSize;
    this.generateNewPuzzle();

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public takeStep(event: any, activeItem: any) {

    const activeXCoord = activeItem.coordinates[1],
      activeYCoord = activeItem.coordinates[0],
      voidXCoord = this.voidElem.coordinates[1],
      voidYCoord = this.voidElem.coordinates[0];

    if (activeYCoord === voidYCoord && activeXCoord === ( voidXCoord - 1)) {
      this.steps++;
      this.switchElements(activeItem);
      this.checkStatus();
    }

    if (activeYCoord === voidYCoord && activeXCoord === ( voidXCoord + 1)) {
      this.steps++;
      this.switchElements(activeItem);
      this.checkStatus();
    }

    if (activeXCoord === voidXCoord && activeYCoord === (voidYCoord - 1)) {
      this.steps++;
      this.switchElements(activeItem);
      this.checkStatus();
    }

    if (activeXCoord === voidXCoord && activeYCoord === (voidYCoord + 1)) {
      this.steps++;
      this.switchElements(activeItem);
      this.checkStatus();
    }

  }

  public restartPuzzle() {

    this.steps = 0;
    this.sortedArray = [];
    this.puzzleState = [];
    this.itemsArray = [];
    this.switchedElements = [];
    this.subscription.unsubscribe();
    this.generateNewPuzzle();

  }

  public startNew() {
    this.router.navigate(['puzzle/start']);
  }

  public shufflePuzzle() {

    for (let i = this.puzzleState.length - 1; i >= 0; i--) {
      for (let j = this.puzzleState[i].length - 1; j >= 0; j--) {

        const temp = [];

        if (this.puzzleState[i][j] === this.voidElem) {

          if (i < this.puzzleState.length - 1 &&
            this.puzzleState[i + 1][j].id !== this.switchedElements[this.switchedElements.length - 1]) {
            temp.push([i + 1, j]);
          }

          if (i > 0 &&
            this.puzzleState[i - 1][j].id !== this.switchedElements[this.switchedElements.length - 1]) {
            temp.push([i - 1, j]);
          }

          if (j < this.puzzleState[i].length - 1 &&
            this.puzzleState[i][j + 1].id !== this.switchedElements[this.switchedElements.length - 1]) {
            temp.push([i, j + 1]);
          }

          if (j > 0 &&
            this.puzzleState[i][j - 1].id !== this.switchedElements[this.switchedElements.length - 1]) {
            temp.push([i, j - 1]);
          }

          const randMove = temp[this.getRandom(0, temp.length)];
          this.switchedElements.push(this.puzzleState[randMove[0]][randMove[1]].id);
          this.switchElements(this.puzzleState[randMove[0]][randMove[1]]);

          return;

        }
      }
    }
  }

  private tickerFunc(tick) {
    this.ticks = tick;
  }

  private generateNewPuzzle() {

    this.rows = this.puzzleSize[0];
    this.cols = this.puzzleSize[1];
    const puzzleLength = ((this.rows * this.cols));
    let cacheFlag = 1;


    for (let i = 0; i < this.rows; i++) {

      const temp = [];

      for (let j = 0; j < this.cols; j++) {

        temp.push({id: cacheFlag, coordinates: [i, j]});
        this.itemsArray.push({id: cacheFlag, coordinates: [i, j]});

        if (temp[j].id === (puzzleLength)) {
          this.voidElem = temp[j];
        }

        cacheFlag++;
      }
      this.puzzleState.push(temp);
    }

    this.sortedArray = this.itemsArray;

    this.shuffleTimer();
  }

  private shuffleTimer() {

    const times = 5 * (this.rows * this.cols),
      timerDelay = 30;
    this.shufflingFlag = true;

    for (let i = 0; i < times; i++) {

      setTimeout(() => {
        this.shufflePuzzle();
      }, timerDelay * i);
    }

    this.timer = TimerObservable.create(times * timerDelay, 1000);
    this.subscription = this.timer.subscribe(t => this.tickerFunc(t));

    setTimeout(() => {
      this.shufflingFlag = false;
    }, times * timerDelay);
  }

  private gameOver() {

    const newDate = new Date().toString();

    this.puzzleService.saveStats(newDate,
      this.ticks,
      this.steps);

    this.router.navigate(['puzzle/end']);
  }

  private switchElements(activeItem) {

    let tempA = null, tempB = null;

    for (let i = 0; i < this.puzzleState.length; i++) {

      for (let j = 0; j < this.puzzleState[i].length; j++) {

        if (tempA === null && (this.puzzleState[i][j].id === activeItem.id || this.puzzleState[i][j].id === this.voidElem.id)) {
          tempA = [i, j];
          continue;
        }

        if (tempA !== null && (this.puzzleState[i][j].id === activeItem.id || this.puzzleState[i][j].id === this.voidElem.id)) {
          tempB = [i, j];

          const tempBItem = this.puzzleState[tempB[0]][tempB[1]],
            tempBCoordinates = tempBItem.coordinates,
            tempACoordinates = this.puzzleState[tempA[0]][tempA[1]].coordinates;

          this.puzzleState[i][j] = this.puzzleState[tempA[0]][tempA[1]];
          this.puzzleState[i][j].coordinates = tempBCoordinates;

          this.puzzleState[tempA[0]][tempA[1]] = tempBItem;
          this.puzzleState[tempA[0]][tempA[1]].coordinates = tempACoordinates;

          break;
        }
      }
    }
  }

  private checkStatus() {

    this.itemsArray = this.puzzleState.reduce((a, b) => {
      return a.concat(b);
    });

    let checked = 0;

    for (let i = 0; i < this.itemsArray.length; i++) {

      if (this.itemsArray[i].id === this.sortedArray[i].id) {
        checked++;
      } else {
        break;
      }

      if (checked === this.itemsArray.length) {
        this.gameOver();
      }
    }
  }

  private getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}
