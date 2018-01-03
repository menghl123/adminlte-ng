import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ModalContentComponent} from './modal-content.component';
import {ModalOptions} from './modal-options.model';
import {ModalDismissReasons} from './modal-dismiss-reasons.model';

@Component({
  selector: 'lte-modal-window',
  templateUrl: './modal-window.component.html',
  host: {
    '[@flyInOut]': 'animateState',
    '(@flyInOut.done)': 'onAnimationDone($event)'
  },
  animations: [
    trigger('flyInOut', [
      state('void', style({top: '5%', left: '-10%', opacity: 0})),
      state('in', style({top: '5%', opacity: 1})),
      transition('void => in', animate('0.3s ease-in-out')),
      transition('in => void', animate('0.3s ease-in-out')),
    ])
  ]
})
export class ModalWindowComponent {
  @Input() isOpen = false;
  @Input() instanceCount = 0;
  @Output() animationDone = new EventEmitter<any>();
  @ViewChild(ModalContentComponent) modalContent: ModalContentComponent;
  dismiss: EventEmitter<any>;
  modalOptions: ModalOptions;
  animateState: string;

  constructor(private elementRef: ElementRef) {
  }

  open() {
    this.isOpen = true;
    if (this.modalOptions.animation) {
      this.animateState = 'in';
    }
  }

  close() {
    this.isOpen = false;
    if (this.modalOptions.animation) {
      this.animateState = 'void';
      return this.animationDone;
    }
    setTimeout(() => this.onAnimationDone(null));
    return this.animationDone;
  }

  onAnimationDone($event) {
    this.animationDone.emit($event);
  }

  @HostListener('click', ['$event'])
  onBackdropClick($event: Event) {
    if (!this.modalOptions.modal && this.elementRef.nativeElement === $event.target) {
      this.dismiss.error(ModalDismissReasons.BACKDROP_CLICK);
    }
  }

  @HostListener('keyup.esc', ['$event'])
  onEscKeyUp($event: KeyboardEvent) {
    if (this.modalOptions.keyboard !== false) {
      this.dismiss.error(ModalDismissReasons.ESC_KEY);
    }
  }

  addContent<T>(options: ModalOptions, dimiss: EventEmitter<T>): EventEmitter<T> {
    this.modalOptions = options;
    this.dismiss = dimiss;
    this.modalContent.addContent(options, this.dismiss);
    return this.dismiss;
  }

}
