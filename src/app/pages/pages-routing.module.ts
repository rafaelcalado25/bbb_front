import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { VotacaoComponent } from './votacao/votacao.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [    
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },    
    {
      path: 'votacao',
      component: VotacaoComponent,
    }, 
    {
      path: '',
      redirectTo: 'votacao',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
