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
  storedNumsToDrawFrom: Array<any> = [];
  result: number = 0;
  originalSource: any;
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
    this.populateStoredNumbers();
  }

  populateStoredNumbers(workingOn = this.storedNumsToDrawFrom) {
    return new Promise((resolve, reject) => {
      const finalize = opts => {
        workingOn.push(...('' + Math.round(opts.iterable)).split(''));
        if (workingOn && (parseInt(workingOn.join(''), 10) > AppSettings.RAND_NUM_MAGNITUDE)) {
          this.storedNumsToDrawFrom = workingOn;
          this.originalSource = opts.originalSource;
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
      let iterable = Math.random();
      if (iterable *= AppSettings.RAND_NUM_MAGNITUDE) {
        return resolve({ originalSource: { type: 2 }, iterable });
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
    const seed = Number('.' + shuffle(this.storedNumsToDrawFrom.splice(0, desiredLength)).join(''));

    return Math.floor(seed * (max - min + 1)) + min;
  };

  selectOfRandNumsToEndWithinRange() {
    const max = parseInt(this.reqForm.controls['max'].value, 10);
    const min = parseInt(this.reqForm.controls['min'].value, 10);
    const desiredLength = ('' + max).length;

    if (this.storedNumsToDrawFrom.length < desiredLength) {
      return new Promise((resolve, reject) => {
        return this.populateStoredNumbers()
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
