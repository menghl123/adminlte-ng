import { HostListener, EventEmitter, Output, Input, Directive, ContentChild, ElementRef } from '@angular/core';


@Directive({
  selector: '[lteDraggableHandle]'
})
export class DraggableHandleDirective {
  constructor(public elementRef: ElementRef) {
  }
}

@Directive({
  selector: '[lteDraggable]',
  host: {
    '[draggable]': '!disabled'
  }
})
export class DraggableDirective {
  static DRAGGABLE_DATA_KEY = 'text';
  @Input() disabled = false;
  @Input('lteDraggable') group: string;
  @Input() dragData: any;
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/effectAllowed
  @Input() dragEffect: 'none' | 'copy' | 'copyLink' | 'copyMove' | 'link' | 'linkMove' | 'move'
    | 'all' | 'uninitialized' = 'copy';

  @Output() onDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onDragEnd: EventEmitter<any> = new EventEmitter();
  @Output() onDragging: EventEmitter<any> = new EventEmitter();
  handle: any;
  @ContentChild(DraggableHandleDirective) draggableHandle: DraggableHandleDirective;

  @HostListener('dragstart', ['$event'])
  dragStart($event) {
    if (!this.draggableHandle || this.draggableHandle.elementRef.nativeElement === this.handle) {
      $event.stopPropagation();
      $event.dataTransfer.effectAllowed = this.dragEffect;
      $event.dataTransfer.setData(DraggableDirective.DRAGGABLE_DATA_KEY, JSON.stringify({
        group: this.group,
        data: this.dragData
      }));
      this.onDragStart.emit($event);
      return;
    }
    $event.preventDefault();
  }

  @HostListener('drag', ['$event'])
  drag($event) {
    this.onDragging.emit($event);
  }

  @HostListener('dragend', ['$event'])
  dragEnd($event) {
    this.onDragEnd.emit($event);
  }

  @HostListener('mouseover', ['$event'])
  mouseover(event) {
    this.handle = event.target;
  }

  @HostListener('mouseleave', ['$event'])
  mouseleave(event) {
    this.handle = null;
  }

}
