import { Injectable } from "@angular/core";

import * as moment from 'moment';

import { BaseService } from '../../shared/base.service';
import { IGlobalInfo, IGlobalLatest, ICountry, IGlobalLatestTransformed } from './covid-info.model';
import { CovidInfoConstant } from './covid-info-constant';
import { AppConstant } from '../../shared/app-constant';

@Injectable({
    providedIn: "root"
})
export class CovidInfoService extends BaseService {    
    constructor() {
        super();
    }

    getGlobal(args?: { forceRefresh? }): Promise<IGlobalInfo> {
        return new Promise(async (resolve, reject) => {
            let info: IGlobalInfo;
            //check if local is expired
            if(!args || !(args && args.forceRefresh)) {
                info = await this.appSettingSvc.get<IGlobalInfo>(CovidInfoConstant.KEY_GLOBAL_INFO);
                if(info) {
                    const now = moment();
                    const createdOn = moment(info.createdOn, AppConstant.DEFAULT_DATETIME_FORMAT);
                    //let cached expired!
                    const hours = moment.duration(now.diff(createdOn)).asHours();
                    if(hours >= CovidInfoConstant.DEFAULT_GLOBAL_INFO_CACHE_HOURS) {
                        info = null;
                    }
                }

            } 
            
            if(!info) {
                try {
                    info = await this.getData<IGlobalInfo>({ url: `global` });
                    if(info) {
                        info.createdOn = moment().format(AppConstant.DEFAULT_DATETIME_FORMAT);
                        await this.appSettingSvc.put(CovidInfoConstant.KEY_GLOBAL_INFO, info);
                    }
                } catch(e) {
                    reject(e);
                }
            }

            resolve(info);
        });
    } 

    getGlobalLatest(args?: { forceRefresh? }): Promise<IGlobalLatestTransformed> {
        return new Promise(async (resolve, reject) => {
            let response: IGlobalLatest;
            //check if local is expired
            if(!args || !(args && args.forceRefresh)) {
                response = await this.appSettingSvc.get<IGlobalLatest>(CovidInfoConstant.KEY_GLOBAL_LATEST);
                if(response) {
                    const now = moment();
                    const createdOn = moment(response.createdOn, AppConstant.DEFAULT_DATETIME_FORMAT);
                    //let cached expired!
                    const hours = moment.duration(now.diff(createdOn)).asHours();
                    if(hours >= CovidInfoConstant.DEFAULT_GLOBAL_INFO_CACHE_HOURS) {
                        response = null;
                    }
                }
            } 
            
            if(!response) {
                try {
                    response = await this.getData<IGlobalLatest>({ url: `global/latest` });
                    if(response) {
                        response.result = response.result.sort((a: Object, b: Object) => {
                            return (Object.values(a)[0].confirmed > Object.values(b)[0].confirmed 
                            ? -1 
                            : (Object.values(a)[0].confirmed < Object.values(b)[0].confirmed ? 1 : 0));
                        });
                        response.createdOn = moment().format(AppConstant.DEFAULT_DATETIME_FORMAT);
                        await this.appSettingSvc.put(CovidInfoConstant.KEY_GLOBAL_LATEST, response);
                    }
                } catch(e) {
                    reject(e);
                }
            }

            const data: IGlobalLatestTransformed = {
                date: response.date,
                result: null,
                createdOn: response.createdOn
            };
            //map countries
            if(response) {
                const countries = await this.appSettingSvc.getCountries();
                data.result = response.result.map(r => {
                    const code = Object.keys(r)[0];
                    const country = countries.filter(c => c["alpha-3"] == code)[0];
                    if(country) {
                        r[code].countryName = country.name;
                    }
                    return r[code];
                });
            }
            resolve(data);
        });
    }


}