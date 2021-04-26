import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { GroupControlComponent } from './group-control/group-control.component';
import { ConditionFormComponent } from './condition-form/condition-form.component';
import { EvseFormComponent } from './evse-form/evse-form.component';
import { PanelControlComponent } from './panel-control/panel-control.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [ AppComponent, HelloComponent, GroupControlComponent, ConditionFormComponent, EvseFormComponent, PanelControlComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
