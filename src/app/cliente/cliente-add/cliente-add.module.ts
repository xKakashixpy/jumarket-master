import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteAddPageRoutingModule } from './cliente-add-routing.module';


import { ClienteAddPage } from './cliente-add.page';
import { ReactiveFormsModule } from '@angular/forms';  // <<========
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteAddPageRoutingModule,
    ReactiveFormsModule,      // <<========
    HttpClientModule,         // <<======
  ],
  declarations: [ClienteAddPage]
})
export class ClienteAddPageModule {}
