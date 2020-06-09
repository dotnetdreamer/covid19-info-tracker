import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';
import {
  ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexXAxis, ApexPlotOptions,
  ApexNonAxisChartSeries, ApexLegend, ApexYAxis, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexResponsive
} from "ng-apexcharts";
import { BasePage } from '../../shared/base.page';
import { AppConstant } from '../../shared/app-constant';
import { IGlobalInfo, IGlobalLatest, IGlobalLatestTransformed } from '../../generic/covid-info/covid-info.model';
import { CovidInfoService } from '../../generic/covid-info/covid-info.service';

export type CategoryChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  legend: ApexLegend
};

@Component({
  selector: 'page-home-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage extends BasePage implements OnInit, OnDestroy {
  searchText = "";
  globalInfoChartOptions: Partial<CategoryChartOptions>;
  globalInfo: IGlobalInfo = {
    result: {
      confirmed: 0,
      total: 0,
      deaths: 0,
      recovered: 0
    }
  };
  globalCountries: IGlobalLatestTransformed;
  private _allGlobalCountries: IGlobalLatestTransformed;

  constructor(private covidInfoSvc: CovidInfoService) { 
    super();
    
    this._subscribeToEvents();
  }

  async ngOnInit() {
    await this._getGlobalInfo(); 
  }

  async doRefresh(ev) {
    await this._getGlobalInfo({ forceRefresh: true }); 

    setTimeout(() => {
      ev.target.complete();
    }, 300);
  }

  async onSearchChanged(ev: CustomEvent) {
    const term = this.searchText.toLowerCase();
    if(!term) {
      return;
    }
    
    const filtered = this.globalCountries.result
      .filter(c => c['countryName'] && c['countryName'].toLowerCase().startsWith(term));
    this.globalCountries.result = filtered;
  }

  onSearchCleared(ev: CustomEvent) {
    this.globalCountries.result = this._allGlobalCountries.result;
  }

  ngOnDestroy() {
  }

  private async _getGlobalInfo(args?: { forceRefresh? }) {
    if(args && args.forceRefresh) {
      this._setDefaults();
    }

    try {
      const info = await this.covidInfoSvc.getGlobal(args);
      info.result.total = info.result.confirmed + info.result.deaths + info.result.recovered;
      this.globalInfo = info;

      //countries
      const countriesInfo = await this.covidInfoSvc.getGlobalLatest(args);
      this.globalCountries = { ...countriesInfo };
      this._allGlobalCountries = { ...countriesInfo };
    } catch(e) {
      //ignore...
      if(AppConstant.DEBUG) {
        throw e;
      }
    } finally {
      await this._renderCharts();
    }

  }

  private async _renderCharts() {
    const gInfoData = [
      this.globalInfo.result.confirmed,
      this.globalInfo.result.recovered,
      this.globalInfo.result.deaths,
    ];
    const gInfoLabels = await Promise.all([
      this.localizationSvc.getResource('common.confirmed'),
      this.localizationSvc.getResource('common.recovered'),
      this.localizationSvc.getResource('common.deaths'),
    ]);

    this.globalInfoChartOptions = {
      series: gInfoData,
      chart: {
        height: 420,
        type: "pie"
      },
      legend: {
        position: 'bottom'
      },
      labels: [gInfoLabels[0], gInfoLabels[1], gInfoLabels[2]]
    };
  }

  private _subscribeToEvents() {
    
  }

  private _setDefaults() {
    this.globalInfo = {
      result: {
        confirmed: 0,
        total: 0,
        deaths: 0,
        recovered: 0
      }
    };
  }
}
