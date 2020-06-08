import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

import { AppInjector } from './app-injector';
import { HelperService } from './helper.service';
import { LocalizationService } from './localization.service';
import { AppSettingService } from './app-setting.service';

@Component({
    template: 'NO UI TO BE FOUND HERE!',
})
export class BasePage {
    protected router: Router;
    protected helperSvc: HelperService;
    protected localizationSvc: LocalizationService;
    protected pubsubSvc: NgxPubSubService;
    protected appSettingSvc: AppSettingService;

    //used in BackButtonDisableService
    protected canDeactivate = false;

    constructor() {
        const injector = AppInjector.getInjector();

        this.router = injector.get(Router);
        this.helperSvc = injector.get(HelperService);
        this.localizationSvc = injector.get(LocalizationService);
        this.pubsubSvc = injector.get(NgxPubSubService);
        this.appSettingSvc = injector.get(AppSettingService);
    }

    async navigate(args: { path, params?, extras?: NavigationExtras }) {
        if(args.params) {
            await this.router.navigate([args.path, args.params], args.extras)
        } else {
            await this.router.navigate([args.path], args.extras)
        }
    }

    async navigateToHome(shouldReplaceUrl = true) {
        await this.navigate({ path: '/home', extras: shouldReplaceUrl ? { replaceUrl: shouldReplaceUrl } : null });
    }
}
