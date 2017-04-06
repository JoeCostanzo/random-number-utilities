import { FormControl } from '@angular/forms';
import {AppSettings} from '../app/app.settings';

export class NumInputValidator {
  static appSettings: any = new AppSettings();


  static isValid(
    control: FormControl
  ): any {
    if(isNaN(control.value)) {
      return {
        "not a number": true
      };
    }

    if(control.value % 1 !== 0) {
      return {
        "not a whole number": true
      };
    }

    if(control.value < NumInputValidator.appSettings.RAND_NUM_MINIMUM) {
      return {
        "only positive numbers": true
      };
    }

    if (control.value > NumInputValidator.appSettings.RAND_NUM_MAXIMUM) {
      return {
        "number is larger than we support": true
      };
    }

    return null;
  }

}

/**
 * Created by joec on 3/4/2017.
 */
