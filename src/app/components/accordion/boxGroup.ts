import {LteBox} from '../box/box';
import {Input} from '@angular/core';

export abstract class BoxGroup {
  @Input()
  type: 'solid' | 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
  @Input()
  showOneItem: boolean;
  boxs: LteBox[] = [];

  $addItem(box: LteBox) {
    this.$removeItem(box);
    if (this.type) {
      box.type = this.type;
    }
    this.initPanel(box);
    this.boxs.push(box);
  }

  $removeItem(box: LteBox) {
    if (box) {
      const index = this.boxs.findIndex(item => item === box);
      this.removeItemByIndex(index);
    }
  }

  private removeItemByIndex(index: number) {
    if (index !== -1) {
      this.boxs.splice(index, 1);
    }
  }

  protected abstract initPanel(box: LteBox) ;
}
