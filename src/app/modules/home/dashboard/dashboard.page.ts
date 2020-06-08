import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

import * as moment from 'moment';
import {
  ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexXAxis, ApexPlotOptions,
  ApexNonAxisChartSeries, ApexLegend, ApexYAxis, ApexGrid, ApexStroke, ApexTitleSubtitle
} from "ng-apexcharts";
import { AlertController } from '@ionic/angular';
import { BasePage } from '../../shared/base.page';
import { AppConstant } from '../../shared/app-constant';
import { Subscription } from 'rxjs';
import { CovidInfoService } from '../covid-info/covid-info.service';
import { IGlobalInfo } from '../covid-info/covid-info.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
};

export type DateChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

export type CategoryChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  legend: ApexLegend;
};

@Component({
  selector: 'page-home-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardPage extends BasePage implements OnInit, OnDestroy {
  globalInfo: IGlobalInfo = {
    result: {
      confirmed: 0,
      total: 0,
      deaths: 0,
      recovered: 0
    }
  };

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

  ngOnDestroy() {
  }

  private async _getGlobalInfo(args?: { forceRefresh }) {
    if(args && args.forceRefresh) {
      this._setDefaults();
    }

    try {
      const info = await this.covidInfoSvc.getGlobal(args);
      info.result.total = info.result.confirmed + info.result.deaths + info.result.recovered;
      this.globalInfo = info;
    } catch(e) {
      //ignore...
    }

  }

  private async _renderCharts() {
   
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
