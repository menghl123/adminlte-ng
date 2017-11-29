import {Component, EventEmitter, Host, Input, NgModule, OnInit, Optional, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminlteNGConfig} from '../adminlte.config';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Subscription} from 'rxjs/Subscription';
import {LteAccordion} from '../accordion/accordion';
import {BoxGroup} from '../accordion/boxGroup';

@Component({
  selector: 'lte-box',
  template: `
    <div class="box box-{{type}}" [ngStyle]="{'margin-bottom':inAccordion ? '5px' : '15px'}">
      <div class="box-header" [ngClass]="{'with-border':withBorder}" (click)="toggle()">
        <i *ngIf="icon" class="fa fa-{{icon}}"></i>
        <h3 class="box-title">{{title}}</h3>
        <i *ngIf="collapse" class="pull-right fa fa-{{collapsed ? 'plus' : 'minus'}}"></i>
      </div>
      <div class="box-body" [@submenu]="collapsed ? 'hidden' : 'visible'">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0px',
        overflow: 'hidden',
        padding: '0px'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible => hidden', animate('500ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('500ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class LteBox implements OnInit {
  @Input()
  collapse: boolean;
  @Input()
  collapsed: boolean;
  @Output()
  onCollapse: EventEmitter<boolean> = new EventEmitter();
  @Input()
  icon: string;
  @Input()
  type: 'solid' | 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger';
  @Input()
  withBorder: boolean;
  @Input()
  title: string;
  public inAccordion: boolean;

  constructor(private adminlteNGConfig: AdminlteNGConfig,
              @Optional() @Host() public boxGroup: BoxGroup) {
    this.withBorder = this.adminlteNGConfig.box.withBorder;
    this.type = <any>this.adminlteNGConfig.box.type;
    this.inAccordion = <any>this.adminlteNGConfig.box.inAccordion;
    this.collapse = this.adminlteNGConfig.box.collapse;
    this.collapsed = this.adminlteNGConfig.box.collapsed;
  }

  ngOnInit(): void {
    if (this.boxGroup) {
      this.boxGroup.$addItem(this);
    }
  }

  toggle() {
    if (this.collapse) {
      this.collapsed = !this.collapsed;
      this.onCollapse.emit(this.collapsed)
    }
    if (this.boxGroup.showOneItem) {
      this.boxGroup.boxs
        .filter(box => !(box === this))
        .forEach(box => box.collapsed = true);
    }
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LteBox],
  exports: [LteBox]
})
export class BoxModule {

}
