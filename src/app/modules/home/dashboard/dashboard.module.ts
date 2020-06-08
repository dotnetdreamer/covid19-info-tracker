import { NgModule } from '@angular/core';

import { NgApexchartsModule } from 'ng-apexcharts';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsWithFormsModule } from 'src/app/components/components-with-forms.module';

@NgModule({
  imports: [
    ComponentsWithFormsModule,
    PipesModule,
    DashboardPageRoutingModule,
    NgApexchartsModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
