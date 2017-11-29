import {CommonModule} from '@angular/common';
import {Component, EventEmitter, HostListener, Input, NgModule, Output, ViewContainerRef} from '@angular/core';
import {MenuItem} from '../common/model';
import {RouterModule} from '@angular/router';
import {AdminlteNGConfig} from '../adminlte.config';

@Component({
  selector: 'lte-navbar-menu',
  template: `
    <div class="collapse navbar-collapse pull-{{position}}" [ngClass]="{'in':collapsed}">
      <ul class="nav navbar-nav">
        <ng-container *ngFor="let menuItem of menuItems">
          <li *ngIf="!menuItem.children" (click)="menuItemClick(menuItem)"
              [ngClass]="{'active':menuItem?.$routerLinkActive}">
            <a [routerLink]="menuItem?.routerLink">{{menuItem?.label}}<span></span></a>
          </li>
          <li *ngIf="menuItem.children" class="dropdown" [ngClass]="{'open':menuItem.$expand }"
              (click)="menuItemClick(menuItem)">
            <a [routerLink]="menuItem?.routerLink">{{menuItem?.label}}<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li *ngFor="let child of menuItem?.children"><a [routerLink]="child?.routerLink">{{child?.label}}</a></li>
            </ul>
          </li>
        </ng-container>
      </ul>
      <form class="navbar-form navbar-left">
        <ng-content></ng-content>
      </form>
    </div>
  `
})
export class LteNavbarMenu {
  @Input()
  menuItems: MenuItem[];

  @Input()
  position: 'left' | 'right';

  collapsed: boolean;

  @Output()
  onItemClick: EventEmitter<MenuItem> = new EventEmitter();

  @Output()
  onExpand: EventEmitter<MenuItem> = new EventEmitter();


  constructor(private adminlteNGConfig: AdminlteNGConfig) {
    this.position = <any>this.adminlteNGConfig.navbar.position;
    this.collapsed = <any>this.adminlteNGConfig.navbar.collapsed;
  }

  menuItemClick(clickedMenuItem: MenuItem) {
    this.menuItems.forEach(menuItem => {
      if(menuItem !== clickedMenuItem){
        menuItem.$expand = false;
        menuItem.$routerLinkActive = false;
      }
    });
    this.onItemClick.emit(clickedMenuItem);
    if (clickedMenuItem.children) {
      this.onExpand.emit(clickedMenuItem);
      clickedMenuItem.$expand = !clickedMenuItem.$expand;
      event.preventDefault();
      event.stopPropagation();
    } else {
      clickedMenuItem.$routerLinkActive = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e) {
    this.menuItems.forEach(menuItem => menuItem.$expand = false);
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

}

@Component({
  selector: 'lte-navbar-custom-menu',
  template: `
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <li>
          <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
        </li>
      </ul>
    </div>
  `
})
export class LteNavbarCustomMenu {
  @Input()
  menuItems: MenuItem[];

  constructor() {

  }

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [LteNavbarMenu, LteNavbarCustomMenu],
  exports: [LteNavbarMenu, LteNavbarCustomMenu]
})
export class NavbarModule {

}
