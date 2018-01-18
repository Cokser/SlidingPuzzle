import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PuzzleComponent} from './puzzle.component';
import {PuzzleRoutingModule} from './puzzle-routing.module';
import {StartScreenComponent} from './start-screen/start-screen.component';
import {GameScreenComponent} from './game-screen/game-screen.component';
import {EndScreenComponent} from './end-screen/end-screen.component';
import {PuzzleService} from './puzzle.service';

@NgModule({
  imports: [
    CommonModule,
    PuzzleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    PuzzleComponent,
    StartScreenComponent,
    GameScreenComponent,
    EndScreenComponent
  ],
  providers: [PuzzleService]
})
export class PuzzleModule {
}
