import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ILanguage } from '../../language/language.model';
import { LanguageService } from '../../language/language.service';
import { BasePage } from '../../shared/base.page';
import { AppConstant } from '../../shared/app-constant';

@Component({
  selector: 'page-generic-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsPage extends BasePage implements OnInit {
  languages: ILanguage[];
  selectedLanguage: ILanguage;

  constructor(private languageSvc: LanguageService) { 
    super();
  }

  async ngOnInit() {
    const res = await Promise.all([
      this.appSettingSvc.getWorkingLanguage(),
      this.languageSvc.getAvailableLanguages()
    ]);

    this.selectedLanguage = await this.languageSvc.getLanguageByCode(res[0]);
    this.languages = res[1];
  }


  async onLanguageChanged(ev: CustomEvent) {
    const { value } = ev.detail;

    const confirm = await this.helperSvc.presentConfirmDialog();
    if(!confirm) {
      return;
    }

    //save
    await this.appSettingSvc.putWorkingLanguage(value);
    //notify
    this.pubsubSvc.publishEvent(AppConstant.EVENT_LANGUAGE_CHANGED, { reload: true });
  }

  private _getAvailableRefreshTimings() {
    const timings = [
      
    ];
    return timings;
  }
}
