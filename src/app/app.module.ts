import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppComponent, ModalTestComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {ZeptoModule} from './components/zepto.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ROUTER_CONFIG} from './ROUTER_CONFIG.route';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ModalTestComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTER_CONFIG),
    ZeptoModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalTestComponent]
})
export class AppModule { }
