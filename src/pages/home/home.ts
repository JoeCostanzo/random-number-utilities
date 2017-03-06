import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RandPage } from '../rand/rand.ts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {
  }

  toPage(choice: number) {
    this.navCtrl.push(
      choice === 0 && (RandPage)
    );
  }
}
