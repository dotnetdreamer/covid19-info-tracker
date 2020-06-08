import { Pipe } from '@angular/core';

import { LocalizationService } from '../modules/shared/localization.service';
import { AppSettingService } from '../modules/shared/app-setting.service';
import { ICountry } from '../modules/home/covid-info/covid-info.model';


@Pipe({
  name:"country"
})
export class CountryMapPipe {
    constructor(private appSettingSvc: AppSettingService) {
        console.log('CountryMapPipe');
    }

    transform(country) {
        return new Promise((resolve, reject) => {

        });
    }
}