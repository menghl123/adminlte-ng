import {Component, Input, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminlteNGConfig} from '../adminlte.config';

@Component({
  selector: 'lte-progress-bar',
  template: `
    <div class="progress {{size ? size : ''}}">
      <div [ngClass]="{'progress-bar-striped':striped,'active':animate}" class="progress-bar progress-bar-{{type}} "
           role="progressbar"
           [ngStyle]="{'width':value}"
           [attr.aria-valuenow]="value" aria-valuemin="min"
           [attr.aria-valuemax]="max"
           [style.min-width.%]="value * 100 / max">
        <span *ngIf="text" class="sr-only">{{text}}</span>
      </div>
    </div>
  `
})
export class LteProgressBar {
  @Input()
  type: 'primary' | 'green' | 'aqua' | 'yellow' | 'red';
  @Input()
  size: 'sm' | 'xs' | 'xxs';
  @Input()
  striped: boolean;
  @Input()
  animate: boolean;
  @Input()
  value: number;
  @Input()
  max: number;
  @Input()
  min: number;
  @Input()
  text:string;

  constructor(private adminlteNGConfig: AdminlteNGConfig) {
    this.type = <any>this.adminlteNGConfig.progressBar.type;
    this.size = <any>this.adminlteNGConfig.progressBar.size;
    this.striped = this.adminlteNGConfig.progressBar.striped;
    this.animate = this.adminlteNGConfig.progressBar.animate;
    this.max = this.adminlteNGConfig.progressBar.max;
    this.min = this.adminlteNGConfig.progressBar.min;
  }

}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [LteProgressBar],
  exports: [LteProgressBar]
})
export class ProgressBarModule {

}
