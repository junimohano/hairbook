import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { MdButtonModule, MdCheckboxModule } from '@angular/material';

const modules = [
  CommonModule,
  HttpModule,

  MdButtonModule,
  MdCheckboxModule
];

@NgModule({
  imports: [
    modules
  ],
  exports: [
    modules
  ],
  declarations: []
})
export class SharedModule { }
