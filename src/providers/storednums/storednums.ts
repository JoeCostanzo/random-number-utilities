import {Injectable} from '@angular/core';
import { AppSettings } from '../../app/app.settings';
import { Crawler } from "../crawler/crawler";

@Injectable()
export class StoredNumbers {
  storedNumArray: Array<any> = [];
  originalSource: any;
  providerLoadPending: boolean = false;

  constructor(
    private appSettings: AppSettings,
    private crawler: Crawler,
  ) {
  }

  populateStoredNumbers(workingOn = this.storedNumArray) {
    this.providerLoadPending = true;
    return new Promise((resolve, reject) => {
      const finalize = opts => {
        workingOn.push(...('' + Math.round(opts.iterable)).split(''));
        if (workingOn && (parseInt(workingOn.join(''), 10) > this.appSettings.RAND_NUM_MAXIMUM)) {
          this.storedNumArray = workingOn;
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
      if (iterable *= this.appSettings.RAND_NUM_MAXIMUM) {
        return resolve({ originalSource: { type: 2 }, iterable });
      }
      return reject('Error generating random numbers by Math.random');
    });
  }
}

/**
 * Created by joec on 4/6/2017.
 */
