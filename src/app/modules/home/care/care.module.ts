import { NgModule } from '@angular/core';

import { CarePageRoutingModule } from './care-routing.module';

import { CarePage } from './care.page';
import { ComponentsWithOutFormsModule } from 'src/app/components/components-without-forms.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    ComponentsWithOutFormsModule,
    PipesModule,
    CarePageRoutingModule
  ],
  declarations: [CarePage]
})
export class CarePageModule {}
