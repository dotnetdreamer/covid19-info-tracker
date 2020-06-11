import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarePage } from './care.page';

const routes: Routes = [
  {
    path: '',
    component: CarePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarePageRoutingModule {}
