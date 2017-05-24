import { Component } from '@angular/core';
import { HomePage } from '../../pages/home/home.ts';
import { NavController } from 'ionic-angular';
import { StoredNumbers } from '../../providers/storednums/storednums';
import { shuffle } from 'lodash';

@Component({
  selector: 'page-cointoss',
  templateUrl: 'cointoss.html'
})
export class CoinToss {
  simulateFetching: boolean = false;
  tossReqFulfilled: boolean = false;
  heads: number = 0;
  tails: number = 0;
  result: string = '';
  seedDataLength: number = 7;

  constructor(
    public navCtrl: NavController,
    private storedNumbers: StoredNumbers
  ) {
    if (storedNumbers.storedNumArray.length < this.seedDataLength) {
      storedNumbers.populateStoredNumbers();
    }
  }

  toss(e: any) {
    e && (e.preventDefault) && (e.preventDefault());
    this.simulateFetching = true;
    this.tossReqFulfilled = false;
    const setResult = x => {
      this.tossReqFulfilled = true;
      if (x) {
        return this.result = 'heads';
      }
      this.result = 'tails';
    };
    if (this.storedNumbers.storedNumArray.length < this.seedDataLength) {
      return this.storedNumbers.populateStoredNumbers()
        .then(() => setResult(this.calculateCoinToss()))
        .catch(err => {});
    }
    setTimeout(() => {
      setResult(this.calculateCoinToss());
    }, 1500);
  }


  calculateCoinToss() {
    this.simulateFetching = false;
    const seed = Number('.' + shuffle(this.storedNumbers.storedNumArray.splice(0, this.seedDataLength)).join(''));
    return Math.floor(seed * 2) == 0;
  }


  toPage(choice: number) {
    this.navCtrl.push(
      choice === 0 && (HomePage)
    );
  }
}
