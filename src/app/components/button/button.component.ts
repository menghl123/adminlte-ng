import {Component, Input, OnInit, TemplateRef, Output, EventEmitter, HostListener, ElementRef} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {ActionItem} from './action-item.model';

@Component({
  selector: 'zp-action-button',
  templateUrl: './button.component.html',
  animations: [
    trigger('buttonState', [
      state('inactive', style({
        opacity: '0',
        height: 0
      })),
      state('active', style({
        opacity: '1',
        height: '*'
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ]
})
export class ButtonComponent {
  @Input() type: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger' = 'default';
  @Input() btnSize: 'lg' | 'sm' | 'xs';
  @Input() cssClass: string;
  @Input() actions: ActionItem[];
  @Input() disabled = false;
  @Input() buttonTemplate: TemplateRef<any>;
  @Input() trigger: 'click' | 'hover' = 'click';
  @Output() actionClick = new EventEmitter<ActionItem>();
  @Output() openStatusChange = new EventEmitter<boolean>();
  isOpen = false;

  constructor(private elementRef: ElementRef) {

  }


  @HostListener('document:click', ['$event'])
  onDocumentClick($event) {
    if (!this.elementRef.nativeElement.contains($event.target)) {
      this.close();
    }
  }

  close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.openStatusChange.emit(this.isOpen);
    }
  }

  private buttonToggle() {
    this.isOpen = !this.isOpen;
    this.openStatusChange.emit(this.isOpen);
  }

  onMouseClick() {
    if (this.trigger === 'click') {
      this.buttonToggle();
    }
  }

  onMouseOver() {
    if (this.trigger === 'hover') {
      this.buttonToggle();
    }
  }

  onMouseLeave() {
    if (this.trigger === 'hover') {
      this.buttonToggle();
    }
  }

  onActionClick(item: ActionItem) {
    if (!item.disabled) {
      this.close();
      this.actionClick.emit(item);
    }
  }
}
