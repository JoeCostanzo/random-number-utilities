import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppSettings } from '../../app/AppSettings';

import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class Crawler {
  results: any;

  constructor(private http: Http, private platform: Platform) {
    this.results = null;
  }

  loadNums() {
    return new Promise((resolve, reject) => {
      // return reject('Uncomment to test network failure.');

      return this.http.get(`${this.platform.is('cordova') ? `https://beacon.nist.gov/rest/record/last` : `/nist/rest/record/last`}`)
        .map((res: Response) => res.text())
        .subscribe(
          data => {
            let re = new RegExp(/outputValue>(.*)/);
            let tmp = (data.match(re)[1].split(/</)[0].replace(/([a-z])/gi, "")).split('');
            tmp.length = ("" + AppSettings.RAND_NUM_MAGNITUDE).length;
            return resolve(parseInt(tmp.join(), 10));
          },
          err => reject(console.log('errno, crawler', err)),
          () => {}//success
      )
    })

  }

}


/**
 * Created by joec on 3/3/2017.
 */
