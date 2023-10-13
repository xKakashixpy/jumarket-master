import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteAllPage } from './cliente-all.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteAllPageRoutingModule {}
