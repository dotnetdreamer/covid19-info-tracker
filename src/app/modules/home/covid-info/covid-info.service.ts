import { Injectable } from "@angular/core";

import * as moment from 'moment';

import { BaseService } from '../../shared/base.service';
import { IGlobalInfo } from './covid-info.model';
import { CovidInfoConstant } from './covid-info-constant';
import { AppConstant } from '../../shared/app-constant';

@Injectable({
    providedIn: "root"
})
export class CovidInfoService extends BaseService {    
    constructor() {
        super();
    }

    getGlobal(args?: { forceRefresh }): Promise<IGlobalInfo> {
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


}