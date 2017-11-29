import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentRef} from './window-ref/document-ref.service';
import {WindowRef} from './window-ref/window-ref.service';
import {AdminlteNGConfig} from './adminlte.config';
import {LayoutModule} from './layout/layout';
import {DomHandler} from './dom/domhandler';
import {SidebarMenuModule} from './sidebar-menu/sidebar-menu';
import {NavbarModule} from './navbar/navbar';
import {BreadcrumbModule} from './breadcrumb/breadcrumb';
import {TabModule} from './tab/tab';
import {BoxModule} from './box/box';
import {AccordionModule} from './accordion/accordion';
import {AutoCompleteModule} from './autocomplete/auto-complete.module';
import {PositionService} from './dom/positioning.service';
import {SplitButtonModule} from './button/splitButton';
import {AlertBoxModule} from './alert-box/alert-box';
import {ProgressBarModule} from './progressBar/progressBar';
import {CarouselModule} from './carousel/carousel';


@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SidebarMenuModule,
    NavbarModule,
    BreadcrumbModule,
    TabModule,
    BoxModule,
    AccordionModule,
    AutoCompleteModule,
    SplitButtonModule,
    AlertBoxModule,
    ProgressBarModule,
    CarouselModule
  ],
  exports: [
    LayoutModule,
    SidebarMenuModule,
    NavbarModule,
    BreadcrumbModule,
    TabModule,
    BoxModule,
    AccordionModule,
    AutoCompleteModule,
    SplitButtonModule,
    AlertBoxModule,
    ProgressBarModule,
    CarouselModule
  ],
  declarations: []
})
export class AdminlteModule {
  static forRoot(): ModuleWithProviders {

    return {
      ngModule: AdminlteModule,
      providers: [
        ...COMMON_SERVICES,
        {provide: AdminlteNGConfig, useClass: AdminlteNGConfig}
      ]
    };
  }
}

export const COMMON_SERVICES: Provider[] = [
  {provide: DocumentRef, useClass: DocumentRef},
  {provide: WindowRef, useClass: WindowRef},
  {provide: DomHandler, useClass: DomHandler},
  {provide: PositionService, useClass: PositionService}
];
