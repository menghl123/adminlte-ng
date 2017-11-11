import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentRef} from './window-ref/document-ref.service';
import {WindowRef} from './window-ref/window-ref.service';
import {AdminlteNGConfig} from './adminlte.config';
import {LayoutModule} from './layout/layout';
import {DomHandler} from './dom/domhandler';
import {SidebarMenuModule} from './sidebar-menu/sidebar-menu';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    SidebarMenuModule
  ],
  exports: [
    LayoutModule,
    SidebarMenuModule
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
  {provide: DomHandler, useClass: DomHandler}
];
