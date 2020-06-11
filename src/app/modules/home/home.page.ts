import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { BasePage } from '../shared/base.page';
import { AppConstant } from '../shared/app-constant';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage extends BasePage {
  @ViewChild('homeTabs') homeTabs : IonTabs;

  selectedTab = 'home';
  constructor() {
    super();
  }

  async onTabClicked(selectedTab) {
    this.selectedTab = selectedTab;
    if(AppConstant.DEBUG) {
      console.log('selectedTab', this.selectedTab);
    }

    if(selectedTab === 'home') {
      await this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      this.homeTabs.select(selectedTab);
    }
  }

}
