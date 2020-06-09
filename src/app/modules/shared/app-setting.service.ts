import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { DbService } from './db/db-base.service';
import { DbSqlService } from './db/db-sql.service';
import { SchemaService } from './db/schema.service';
import { AppConstant } from './app-constant';
import { AppInjector } from './app-injector';
import { DbWebService } from './db/db-web.service';
import { ICountry } from '../generic/covid-info/covid-info.model';

@Injectable({
    providedIn: 'root'
})
export class AppSettingService {
    protected static settingCache = new Map();
    

    protected dbService: DbService;
    protected schemaSvc: SchemaService;
    protected platform: Platform;

    private static _countries;
 
    constructor() {
        // https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
        const injector = AppInjector.getInjector();
        
        // if(this.platform.is('cordova')) {
        //     this.dbService = injector.get(DbSqlService);
        // } else {
            this.dbService = injector.get(DbWebService);
        // }
        this.schemaSvc = injector.get(SchemaService);
        this.platform = injector.get(Platform);
    }

    async getCountries(): Promise<ICountry[]> {
        if(AppSettingService._countries) {
            return AppSettingService._countries;
        }

        const wk = await this.getWorkingLanguage();
        let resources = await import (`../../../assets/localization/${wk}/countries.json`);
        let countryList = <ICountry[]>resources.default;
        // countryList = countryList.groupBy((c: ICountry) => c["alpha-3"]);

        AppSettingService._countries = countryList;
        return <any>countryList;
    }

    putWorkingLanguage(lang) {
        return this.dbService.putLocal(this.schemaSvc.tables.setting, {
            key: AppConstant.KEY_WORKING_LANGUAGE,
            value: lang
        }).then(() => {
            AppSettingService.settingCache.set(AppConstant.KEY_WORKING_LANGUAGE, lang);
        });
    }

    getWorkingLanguage() {
        return this.get<string>(AppConstant.KEY_WORKING_LANGUAGE);
    }

    get<T>(key: string): Promise<T> {
        if(AppSettingService.settingCache.has(key)) {
            return new Promise((resolve, reject) => {
                let settingCacheMap = AppSettingService.settingCache.get(key);
                resolve(settingCacheMap);
            });
        }
        else {
            return this.dbService.get<any>(this.schemaSvc.tables.setting, key)
                .then(setting => {
                    if (setting && setting.value) {
                        AppSettingService.settingCache.set(key, setting.value);
                        return setting.value;
                    }
                    return null;
            });
        }
    }

    put(key: string, values) {
        return this.dbService.putLocal(this.schemaSvc.tables.setting, {
            key: key,
            value: values
        }).then(() => {
            AppSettingService.settingCache.set(key, values);
        });
    }
}