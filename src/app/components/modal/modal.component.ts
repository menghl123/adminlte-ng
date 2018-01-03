import {Component, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {ModalOptions} from './modal-options.model';
import {ModalWindowComponent} from './modal-window.component';
import {DocumentRef} from '../window-ref/document-ref.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'zp-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  static MODEL_OPEN_CSS = 'modal_open';
  @Input() isOpen = false;
  @Output() dismiss = new EventEmitter<any>();
  @Input() modalOptions: ModalOptions;
  @ViewChild(ModalWindowComponent) modalWindowComponent: ModalWindowComponent;
  instanceCount = 0;

  constructor(private render: Renderer2, private documentRef: DocumentRef) {
  }

  open() {
    this.isOpen = true;
    this.modalWindowComponent.open();
    this.toggleBodyClass(true);
  }

  close(): Observable<any> {
    this.modalWindowComponent.close().do(_ => this.isOpen = false);
    return this.modalWindowComponent.close()
      .do(_ => this.isOpen = false);
  }

  cleanup() {
    this.toggleBodyClass(false);
  }

  addContent<T>(options: ModalOptions, instanceCount: number): EventEmitter<T> {
    this.modalOptions = options;
    this.instanceCount = instanceCount;
    this.modalWindowComponent.addContent(options, this.dismiss);
    return this.dismiss;
  }


  private toggleBodyClass(isAdd: boolean): void {
    if (isAdd) {
      this.render.addClass(this.documentRef.body, ModalComponent.MODEL_OPEN_CSS);
      return;
    }
    this.render.removeClass(this.documentRef.body, ModalComponent.MODEL_OPEN_CSS);
  }
}
