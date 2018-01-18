import {Injectable} from '@angular/core';
import {Stat} from './Stat';

@Injectable()
export class PuzzleService {

  public puzzleSize: number[] = [];
  public userName: string;
  public stats: Stat[] = [];

  constructor() {
  }

  public saveStats( date: string,
                    score: number,
                    steps: number) {
    this.stats.push({
      name: this.userName,
      date: date,
      score: score,
      steps: steps,
      size: this.puzzleSize
    });
  }

  public getStats() {
    return this.stats;
  }

  public setConfig(config: any) {
    this.userName = config.name;
    this.puzzleSize = [ config.rows, config.cols];
  }
}
