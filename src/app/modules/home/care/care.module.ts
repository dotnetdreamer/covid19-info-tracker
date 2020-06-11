import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarePageRoutingModule } from './care-routing.module';

import { CarePage } from './care.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarePageRoutingModule
  ],
  declarations: [CarePage]
})
export class CarePageModule {}
