import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteListPageRoutingModule } from './cliente-list-routing.module';

import { ClienteListPage } from './cliente-list.page';

// Agregamos Librería CDK
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScrollingModule,  // <=====
    DragDropModule,   // <=====
    ClienteListPageRoutingModule
  ],
  declarations: [ClienteListPage]
})
export class ClienteListPageModule {}
