import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoComponent} from './demo.component';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './demo.router';
import {AdminlteModule} from '../components/adminlte.module';
import {LayoutComponent} from './layout/layout.component';
import {LayoutTopnavigationComponent} from './layout/layoutDemos/layout-topnavigation.component';
import {CodeHighlighterModule} from './codehighlighter/codehighlighter';
import { TabDemoComponent } from './tab-demo/tab-demo.component';
import { BoxDemoComponent } from './box-demo/box-demo.component';
import { AccordionDemoComponent } from './accordion-demo/accordion-demo.component';
import { MinimalDemoComponent } from './minimal-demo/minimal-demo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SplitButtonDemoComponent } from './split-button-demo/split-button-demo.component';
import { AlerBoxDemoComponent } from './aler-box-demo/aler-box-demo.component';
import { ProgressBarDemoComponent } from './progress-bar-demo/progress-bar-demo.component';
import { CarouselDemoComponent } from './carousel-demo/carousel-demo.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTER_CONFIG),
    AdminlteModule,
    CodeHighlighterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [DemoComponent, LayoutComponent, LayoutTopnavigationComponent, TabDemoComponent, BoxDemoComponent, AccordionDemoComponent, MinimalDemoComponent, SplitButtonDemoComponent, AlerBoxDemoComponent, ProgressBarDemoComponent, CarouselDemoComponent]
})
export class DemoModule {
}
