import { Injectable } from "@angular/core";

import * as moment from 'moment';

import { BaseService } from '../../shared/base.service';
import { IGlobalInfo, IGlobalLatest } from './covid-info.model';
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

    getGlobalLatest(args?: { forceRefresh }): Promise<IGlobalLatest> {
        return new Promise(async (resolve, reject) => {
            let data: IGlobalLatest;
            //check if local is expired
            if(!args || !(args && args.forceRefresh)) {
                data = await this.appSettingSvc.get<IGlobalLatest>(CovidInfoConstant.KEY_GLOBAL_LATEST);
                if(data) {
                    const now = moment();
                    const createdOn = moment(data.createdOn, AppConstant.DEFAULT_DATETIME_FORMAT);
                    //let cached expired!
                    const hours = moment.duration(now.diff(createdOn)).asHours();
                    if(hours >= CovidInfoConstant.DEFAULT_GLOBAL_INFO_CACHE_HOURS) {
                        data = null;
                    }
                }
            } 
            
            if(!data) {
                try {
                    data = await this.getData<IGlobalLatest>({ url: `global/latest` });
                    if(data) {
                        let sortedResult = data.result;
                        sortedResult.sort((a: Object, b: Object) => {
                            return (Object.values(a)[0].confirmed > Object.values(b)[0].confirmed 
                            ? -1 
                            : (Object.values(a)[0].confirmed < Object.values(b)[0].confirmed ? 1 : 0));
                        });
                        data.createdOn = moment().format(AppConstant.DEFAULT_DATETIME_FORMAT);
                        await this.appSettingSvc.put(CovidInfoConstant.KEY_GLOBAL_LATEST, data);
                    }
                } catch(e) {
                    reject(e);
                }
            }

            resolve(data);
        });
    }

}