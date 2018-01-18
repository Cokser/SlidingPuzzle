import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PuzzleComponent} from './puzzle.component';
import {StartScreenComponent} from './start-screen/start-screen.component';
import {GameScreenComponent} from './game-screen/game-screen.component';
import {EndScreenComponent} from './end-screen/end-screen.component';

const routes: Routes = [
  {path: 'puzzle', component: PuzzleComponent, children: [
    {path: 'start', component: StartScreenComponent},
    {path: 'game', component: GameScreenComponent},
    {path: 'end', component: EndScreenComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PuzzleRoutingModule {
}
