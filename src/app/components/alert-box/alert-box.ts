import {Component, Input, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminlteNGConfig} from '../adminlte.config';

@Component({
  selector: 'lte-alert-box',
  template: `
    <div class="alert alert-{{type}}" *ngIf="!closed" [ngStyle]="{'margin-top':'2px'}">
      <button type="button" class="close" *ngIf="closable" (click)="close()">&times;</button>
      <h4 *ngIf="showTitle" ><i class="icon fa {{iconData[type]}}"></i> Alert!</h4>
      <ng-content></ng-content>
    </div>
  `
})
export class AlertBox {
  @Input()
  icon: string;
  @Input()
  title: string;
  @Input()
  type: 'danger' | 'info' | 'warning' | 'success';
  @Input()
  closable: boolean;
  @Input()
  closed: boolean;
  @Input()
  iconData: { [key: string]: string };
  @Input()
  showTitle:boolean;

  constructor(private adminlteNGConfig: AdminlteNGConfig) {
    this.type = <any>this.adminlteNGConfig.alertBox.type;
    this.closable = this.adminlteNGConfig.alertBox.closable;
    this.closed = this.adminlteNGConfig.alertBox.closed;
    this.iconData = this.adminlteNGConfig.alertBox.iconData;
    this.showTitle = this.adminlteNGConfig.alertBox.showTitle;
  }

  close(): void {
    this.closed = true;
  }

}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AlertBox],
  exports: [AlertBox]
})
export class AlertBoxModule {

}
