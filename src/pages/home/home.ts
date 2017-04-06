import { Component } from '@angular/core';
import { RandRange } from '../randrange/randrange.ts';
import { CoinToss } from '../cointoss/cointoss.ts';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
  }

  toPage(choice: number) {
    this.navCtrl.push(
      choice === 1 && (RandRange)
      || choice === 2 && (CoinToss)
    );
  }
}
