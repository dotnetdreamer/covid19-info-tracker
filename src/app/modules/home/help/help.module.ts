import { NgModule } from '@angular/core';

import { HelpPageRoutingModule } from './help-routing.module';

import { HelpPage } from './help.page';
import { ComponentsWithOutFormsModule } from 'src/app/components/components-without-forms.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    ComponentsWithOutFormsModule,
    PipesModule,
    HelpPageRoutingModule
  ],
  declarations: [HelpPage]
})
export class HelpPageModule {}
