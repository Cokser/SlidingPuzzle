import {Component, OnInit} from '@angular/core';
import {FormArray, AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PuzzleService} from '../puzzle.service';

function numberValidator(c: AbstractControl) {

  if (!c.parent || !c) {
    return;
  }
  const currentItem = c.value;

  if (!currentItem) {
    return;
  }
  if (currentItem < 3 || currentItem > 10) {
    return {maxValue: false};
  }
}

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  public puzzleConfigForm: FormGroup;

  constructor(public puzzleService: PuzzleService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.setForm();
  }

  private setForm() {
    this.puzzleConfigForm = this.fb.group({
      name: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ]
      ],
      cols: ['',
        [
          Validators.required,
          numberValidator
        ]
      ],
      rows: ['',
        [
          Validators.required,
          numberValidator
        ]
      ]
    });
  }

  public startPuzzle() {
    if (this.puzzleConfigForm.valid) {
      this.puzzleService.setConfig(this.puzzleConfigForm.value);
      this.router.navigate(['puzzle/game']);
    }
  }
}
