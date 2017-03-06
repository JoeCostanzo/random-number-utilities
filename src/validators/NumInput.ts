import { FormControl } from '@angular/forms';
import { AppSettings } from '../app/AppSettings';

export class NumInputValidator {

  static isValid(control: FormControl): any {

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

    if(control.value < 1) {
      return {
        "only positive numbers": true
      };
    }

    if (control.value > AppSettings.RAND_NUM_MAGNITUDE) {
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
