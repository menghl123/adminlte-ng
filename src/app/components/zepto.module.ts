import {ModuleWithProviders, NgModule, Provider} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from './card/card.module';
import {ZeptoNGConfig} from './zepto-ng.config';
import {AccordionModule} from './accordion/accordion.module';
import {ButtonModule} from './button/button.module';
import {DialogModule} from './dialog/dialog.module';
import {ModalService} from './modal/modal.service';
import {ModalModule} from './modal/modal.module';
import {DocumentRef} from './window-ref/document-ref.service';
import {WindowRef} from './window-ref/window-ref.service';
import {DialogService} from './dialog/dialog.service';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    AccordionModule,
    ButtonModule,
    DialogModule,
    ModalModule
  ],
  exports: [
    CardModule,
    AccordionModule,
    ButtonModule,
    DialogModule,
    ModalModule,
  ],
  declarations: []
})
export class ZeptoModule {
  static forRoot(): ModuleWithProviders {

    return {
      ngModule: ZeptoModule,
      providers: [
        ...COMMON_SERVICES,
        {provide: ZeptoNGConfig, useClass: ZeptoNGConfig},
        { provide: ModalService, useClass: ModalService },
        { provide: DialogService, useClass: DialogService },
      ]
    };
  }
}
export const COMMON_SERVICES: Provider[] = [
  { provide: DocumentRef, useClass: DocumentRef },
  { provide: WindowRef, useClass: WindowRef }
];
