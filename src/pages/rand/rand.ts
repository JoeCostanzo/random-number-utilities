import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { AppSettings } from '../../app/AppSettings';
import { HomePage } from '../home/home.ts';
import { Crawler } from "../../providers/crawler/crawler";
import { NumInputValidator } from "../../validators/NumInput";
import { shuffle } from 'lodash';

@Component({
  selector: 'page-rand',
  templateUrl: 'rand.html',
  viewProviders: [Crawler]
})
export class RandPage {
  numberStore: Array<any> = [];
  result: number = 0;
  providerLoadPending: boolean;
  simulateFetching: boolean = false;
  formReqFulfilled: boolean = false;
  reqForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    private crawler: Crawler
  ) {
    const min = new FormControl(0, NumInputValidator.isValid);
    const max = new FormControl(0, NumInputValidator.isValid);

    this.reqForm = new FormGroup({ min, max });

    this.providerLoadPending = true;
    this.populateNumberStore();
  }

  populateNumberStore(workingOn = this.numberStore) {
    return new Promise((resolve, reject) => {
      const finalize = result => {
        workingOn.push(...('' + Math.round(result)).split(''));
        if (workingOn && (parseInt(workingOn.join(''), 10) > AppSettings.RAND_NUM_MAGNITUDE)) {
          this.numberStore = workingOn;
          this.providerLoadPending = false;
          return resolve();
        }
        this.altRandNumMethod()
          .then(finalize)
          .catch(err => reject(err));
      };
      this.crawler.loadNums()
        .then(finalize)
        .catch(
          err => this.altRandNumMethod()
            .then(finalize)
            .catch(err => reject(err))
        );
    });
  }

  altRandNumMethod() {
    return new Promise((resolve, reject) => {
      let num = Math.random();
      if (num *= AppSettings.RAND_NUM_MAGNITUDE) {
        return resolve(num);
      }
      return reject('Error generating random numbers by Math.random');
    });
  }

  submitFormRequest(e: any) {
    e.preventDefault && (e.preventDefault());
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
    const seed = Number('.' + shuffle(this.numberStore.splice(0, desiredLength)).join(''));

    return Math.floor(seed * (max - min + 1)) + min;
  };

  selectOfRandNumsToEndWithinRange() {
    const max = parseInt(this.reqForm.controls['max'].value, 10);
    const min = parseInt(this.reqForm.controls['min'].value, 10);
    const desiredLength = ('' + max).length;

    if (this.numberStore.length < desiredLength) {
      return new Promise((resolve, reject) => {
        return this.populateNumberStore()
          .then(() => resolve(this.completeSelection({ min, max, desiredLength })))
          .catch(err => reject(err));
      });

    }

    return Promise.resolve(this.completeSelection({ min, max, desiredLength }));
  }

  toHome() {
    this.navCtrl.push(HomePage);
  }
}
