import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationEnd, Router, RouterModule} from '@angular/router';
import {ModalComponent} from './modal.component';
import {ModalWindowComponent} from './modal-window.component';
import {ModalContentComponent} from './modal-content.component';
import {ModalBackdropComponent} from './modal-backdrop.component';
import {ModalService} from './modal.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ModalComponent, ModalWindowComponent, ModalContentComponent, ModalBackdropComponent],
  exports: [ModalBackdropComponent],
  entryComponents: [
    ModalContentComponent,
    ModalComponent,
    ModalBackdropComponent
  ]
})
export class ModalModule {
  constructor(router: Router, modalService: ModalService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        modalService.closeAll();
      }
    });
  }
}
