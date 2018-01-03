import { HostListener, EventEmitter, Output, Input, Directive } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[lteDroppable]',
})
export class DroppableDirective {

  @Input('lteDroppable') group: string;
  @Input() acceptDrop: ($event) => boolean;

  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  @Input() dropEffect: 'copy' | 'move' | 'link' | 'none' = 'move';

  @Output() onDragEnter: EventEmitter<any> = new EventEmitter();

  @Output() onDragLeave: EventEmitter<any> = new EventEmitter();

  @Output() onDrop: EventEmitter<any> = new EventEmitter();

  @Output() onDragOver: EventEmitter<any> = new EventEmitter();


  @HostListener('drop', ['$event'])
  drop($event) {
    if ((!this.group || this.isDropGroup($event)) && (!this.acceptDrop || this.acceptDrop($event))) {
      this.startDrop($event);
    }
  }

  @HostListener('dragenter', ['$event'])
  dragEnter($event) {
    $event.preventDefault();
    if (this.dropEffect) {
      $event.dataTransfer.dropEffect = this.dropEffect;
    }

    this.onDragEnter.emit($event);
  }

  @HostListener('dragleave', ['$event'])
  dragLeave($event) {
    $event.preventDefault();
    this.onDragLeave.emit($event);
  }

  @HostListener('dragover', ['$event'])
  dragOver($event) {
    $event.preventDefault();
    this.onDragOver.emit($event);
  }

  private isDropGroup($event): boolean {
    const contextData = $event.dataTransfer.getData(DraggableDirective.DRAGGABLE_DATA_KEY);
    if (contextData) {
      const draggableData = JSON.parse(contextData);
      return this.group === draggableData.group;
    }
  }

  private startDrop($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onDrop.emit($event);
  }
}
