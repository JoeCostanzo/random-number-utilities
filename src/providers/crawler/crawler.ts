import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppSettings } from '../../app/app.settings';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class Crawler {
  results: any;

  constructor(
    private appSettings: AppSettings,
    private http: Http,
    private platform: Platform
  ) {
    this.results = null;
  }

  loadNums() {
    return new Promise((resolve, reject) => {
      // return reject('Uncomment to test network failure.');

      return this.http.get(`${this.platform.is('cordova') ? `https://beacon.nist.gov/rest/record/last` : `/nist/rest/record/last`}`)
        .map((res: Response) => res.text())
        .subscribe(
          data => {
            let re0 = new RegExp(/timeStamp>(.*)/);
            let re1 = new RegExp(/outputValue>(.*)/);
            const originalSource = {
              type: 1,
              timeStamp: Number(data.match(re0)[1].split(/</)[0]),
              rawNum: data.match(re1)[1].split(/</)[0]
            };
            let tmp = (originalSource.rawNum.replace(/([a-z])/gi, "")).split('');
            tmp.length = ("" + this.appSettings.RAND_NUM_MAXIMUM).length;
            return resolve({
              originalSource,
              iterable: parseInt(tmp.join(""), 10)
            });
          },
          err => reject(console.log('errno, crawler', err)),
          () => {}//success
      );
    });

  }

}


/**
 * Created by joec on 3/3/2017.
 */
