import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./modules/language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'generic',
    loadChildren: () => import('./modules/generic/generic.common.module').then( m => m.GenericCommonModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
