import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BasePage } from '../shared/base.page';
import { LanguageService } from './language.service';
import { ILanguage } from './language.model';
import { AppConstant } from '../shared/app-constant';

@Component({
  selector: 'page-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguagePage extends BasePage implements OnInit {
  availableLanguages: ILanguage[] = [];
  selectedLanguage: ILanguage;

  constructor(private languageSvc: LanguageService) {
    super();
  }

  ngOnInit() {
    this.availableLanguages = this.languageSvc.getAvailableLanguages();
  }

  onLanguageSelected(lang: ILanguage) {
    this.selectedLanguage = lang;
  }

  async onNextButtonClicked() {
    await this.appSettingSvc.putWorkingLanguage(this.selectedLanguage.code);
    
    //notify
    this.pubsubSvc.publishEvent(AppConstant.EVENT_LANGUAGE_CHANGED, { 
      wkLangauge: this.selectedLanguage.code, 
      reload: false,
      isRtl: this.selectedLanguage.isRtl
    });
    
    //navigate
    await this.navigateToHome(true);
  }

}
