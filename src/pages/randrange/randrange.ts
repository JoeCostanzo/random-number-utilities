import {Component} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StoredNumbers } from '../../providers/storednums/storednums';
import { NumInputValidator } from '../../validators/NumInput';
import { HomePage } from '../home/home.ts';
import { CoinToss } from '../cointoss/cointoss.ts';
import { shuffle } from 'lodash';
import { NavController } from 'ionic-angular';
import { AppSettings } from '../../app/app.settings';

@Component({
  selector: 'page-randrange',
  templateUrl: 'randrange.html'
})
export class RandRange {
  result: number = 0;
  simulateFetching: boolean = false;
  formReqFulfilled: boolean = false;
  reqForm: FormGroup;
  seedDataLength: number = 7;

  constructor(
    private appSettings: AppSettings,
    private storedNumbers: StoredNumbers,
    public navCtrl: NavController
  ) {
    const min = new FormControl(0, NumInputValidator.isValid);
    const max = new FormControl(0, NumInputValidator.isValid);

    this.reqForm = new FormGroup({ min, max });

    if (storedNumbers.storedNumArray.length < this.seedDataLength) {
      storedNumbers.populateStoredNumbers();
    }
  }

  submitFormRequest(e: any) {
    e && (e.preventDefault) && (e.preventDefault());
    if (
      parseInt(this.reqForm.controls['max'].value, 10) <= parseInt(this.reqForm.controls['min'].value, 10)
    ) {
      this.reqForm.get('max').setValue(parseInt(this.reqForm.controls['min'].value, 10) + 1);
    }
    if (
      parseInt(this.reqForm.controls['min'].value, 10) >= parseInt(this.reqForm.controls['max'].value, 10)
    ) {
      this.reqForm.get('min').setValue(Math.max(parseInt(this.reqForm.controls['max'].value, 10) - 1, 0));
    }
    this.simulateFetching = true;
    this.formReqFulfilled = false;
    setTimeout(() => {
      this.selectOfRandNumsToEndWithinRange()
        .then(ans => {
          this.result = <number>ans;
          this.simulateFetching = false;
          this.formReqFulfilled = true;
        });
    }, 1500);
  }

  completeSelection({ min, max, desiredLength }) {
    const seed = Number('.' + shuffle(this.storedNumbers.storedNumArray.splice(0, desiredLength)).join(''));

    return Math.floor(seed * (max - min + 1)) + min;
  };

  selectOfRandNumsToEndWithinRange() {
    const max = parseInt(this.reqForm.controls['max'].value, 10);
    const min = parseInt(this.reqForm.controls['min'].value, 10);
    const desiredLength = ('' + max).length;

    if (this.storedNumbers.storedNumArray.length < desiredLength) {
      return new Promise((resolve, reject) => {
        return this.storedNumbers.populateStoredNumbers()
          .then(() => resolve(this.completeSelection({ min, max, desiredLength })))
          .catch(err => reject(err));
      });

    }

    return Promise.resolve(this.completeSelection({ min, max, desiredLength }));
  }

  eraseLeadingZero(e, kind) {
    e && (e.preventDefault) && (e.preventDefault());
    const newNum = parseInt(this.reqForm.controls[kind].value, 10);
    this.reqForm.get(kind).setValue(
      typeof newNum === 'number' && !isNaN(newNum) ? newNum : 0
    );
  }

  toPage(choice: number) {
    this.navCtrl.push(
      choice === 0 && (HomePage)
      || choice === 2 && (CoinToss)
    );
  }
}
