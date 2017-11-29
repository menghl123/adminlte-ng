import {Component, EventEmitter, HostListener, Input, NgModule, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuItem} from '../common/model';
import {AdminlteNGConfig} from '../adminlte.config';

@Component({
  selector: 'lte-split-button',
  template: `
    <div class="btn-group" [ngClass]="{'open':open}">
      <button type="button" class="btn btn-{{type}}">Action</button>
      <button type="button" class="btn btn-{{type}} dropdown-toggle" (click)="toggle()">
        <span class="caret"></span>
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu">
        <ng-container *ngFor="let item of menuItems"> 
          <li *ngIf="item.isDivider" class="divider"></li> 
          <li *ngIf="!item.isDivider" (click)="itemClick(item)"><a>{{item.label}}</a></li>
        </ng-container>
      </ul>
    </div>
  `
})
export class LteSplitButton {
  @Input()
  menuItems: MenuItem[];
  @Input()
  type: 'default' | 'primary' | 'danger' | 'warning' | 'succes';
  @Input()
  open: boolean;
  @Output()
  onItemClick:EventEmitter<MenuItem> = new EventEmitter();

  constructor(private adminlteNGConfig: AdminlteNGConfig) {
    this.type = <any>this.adminlteNGConfig.button.type;
    this.open = <any>this.adminlteNGConfig.button.open;
  }

  itemClick(menuItem:MenuItem){
    this.onItemClick.emit(menuItem);
    if(menuItem.command){
      menuItem.command();
    }
  }

  toggle() {
    this.open = !this.open;
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('document: click', ['$event'])
  onDocumentClick(e) {debugger
    this.open = false;
  }
}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [LteSplitButton],
  exports: [LteSplitButton]
})
export class SplitButtonModule {

}
