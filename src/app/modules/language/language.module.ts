import { NgModule } from '@angular/core';

import { LanguagePageRoutingModule } from './language-routing.module';

import { LanguagePage } from './language.page';
import { ComponentsWithOutFormsModule } from 'src/app/components/components-without-forms.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    ComponentsWithOutFormsModule,
    PipesModule,
    LanguagePageRoutingModule
  ],
  declarations: [LanguagePage]
})
export class LanguagePageModule {}
