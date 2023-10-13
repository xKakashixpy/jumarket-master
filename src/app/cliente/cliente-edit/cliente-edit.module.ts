import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteEditPageRoutingModule } from './cliente-edit-routing.module';

import { ClienteEditPage } from './cliente-edit.page';
import { ReactiveFormsModule } from '@angular/forms';  // <<========
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,      // <<========
    ClienteEditPageRoutingModule
  ],
  declarations: [ClienteEditPage]
})
export class ClienteEditPageModule {}
