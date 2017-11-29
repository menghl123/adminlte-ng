import {
  AfterContentInit, Component, ContentChildren, EventEmitter, forwardRef, Input, NgModule, Output,
  QueryList
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminlteNGConfig} from '../adminlte.config';
import {LteBox} from '../box/box';
import {BoxGroup} from './boxGroup';

@Component({
  selector: 'lte-accordion',
  template: `
    <div class="box">
      <div class="box-body">
        <div class="box-group">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
  providers: [{provide: BoxGroup, useExisting: forwardRef(() => LteAccordion)}],
})
export class LteAccordion extends BoxGroup implements AfterContentInit {
  @Output() onCollapse: EventEmitter<boolean> = new EventEmitter();
  lteBoxs: LteBox[];

  constructor(private adminlteNGConfig: AdminlteNGConfig) {
    super();
    debugger
    this.showOneItem = true;
  }

  protected initPanel(box: LteBox) {
    box.collapse = true;
  }

  ngAfterContentInit(): void {

  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LteAccordion],
  exports: [LteAccordion]
})
export class AccordionModule {

}
