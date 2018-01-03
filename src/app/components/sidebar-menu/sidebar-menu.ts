import {CommonModule} from '@angular/common';
import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {MenuItem} from '../common/model';
import {Router, RouterModule} from '@angular/router';
import {AdminlteNGConfig} from '../adminlte.config';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'lte-sidebar-menu',
  template: `
    <ul class="sidebar-menu">
      <ng-container *ngFor="let menuItem of menuItems">
        <ng-container *ngTemplateOutlet="treeview;context:{item:menuItem}"></ng-container>
      </ng-container>
      <ng-template #treeview let-item="item">
        <li *ngIf="item?.isHeader" class="header">{{item?.label}}</li>
        <li (click)="itemClick(item)" *ngIf="!item?.isHeader" class="treeview"
            [ngClass]="{'menu-open':item.$expand,'active':isActive(item)}">
          <ng-container *ngIf="!item.children || item.children.length === 0">
            <a [routerLink]="item?.routerLink">
              <i *ngIf="item.icon" class="fa {{item?.icon}}"></i>
              <span>{{item?.label}}</span>
              <span *ngIf="item.children" class="pull-right-container">
              <i *ngIf="item.children && item.children.length !== 0" class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
          </ng-container>
          <ng-container *ngIf="item.children && item.children.length !== 0">
            <a>
              <i *ngIf="item.icon" class="fa {{item?.icon}}"></i>
              <span>{{item?.label}}</span>
              <span *ngIf="item.children" class="pull-right-container">
              <i *ngIf="item.children && item.children.length !== 0" class="fa fa-angle-left pull-right"></i>
            </span>
            </a>
          </ng-container>
          <ul *ngIf="item.children" class="treeview-menu"
              [@submenu]="item.$expand ? 'visible' : 'hidden'"
              [ngStyle]="{'display':'block','overflow':'hidden'}">
            <ng-container *ngFor="let menuItem of item.children">
              <ng-container *ngTemplateOutlet="treeview;context:{item:menuItem}"></ng-container>
            </ng-container>
          </ul>
        </li>
      </ng-template>
    </ul>
  `,
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0px',
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible => hidden', animate('500ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hidden => visible', animate('500ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class LteSidebarMenu implements OnInit {
  @Input()
  menuItems: MenuItem[];
  @Input()
  isAccordion: boolean;
  @Output()
  onExpand: EventEmitter<MenuItem> = new EventEmitter();

  constructor(private adminlteNGConfig: AdminlteNGConfig, private router: Router) {
    this.isAccordion = this.adminlteNGConfig.sidebarMenu.isAccordion;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.menuItems.forEach((item) => {
        if (item && item.children) {
          this.childrenActive(item, item.children);
        }
      });
    }, 1000);
  }

  itemClick(menuItem) {
    if (menuItem.children) {
      if (menuItem.$expand) {
        menuItem.$expand = false;
      } else {
        if (this.isAccordion) {
          this.closeOthers(menuItem);
        }
        menuItem.$expand = true;
      }
    }
    event.preventDefault();
    event.stopPropagation();
    this.onExpand.emit(menuItem);
  }

  closeOthers(expandedItem: MenuItem) {
    if (this.menuItems.indexOf(expandedItem) !== -1) {
      this.menuItems.forEach(menuItem => {
        menuItem.$expand = false;
      });
    }
  }

  isActive(item: MenuItem) {
    if (item.routerLink && this.router.url.indexOf(item.routerLink) !== -1) {
      return true;
    }
  }

  private childrenActive(item, children) {
    children.forEach($item => {
      if ($item.routerLink && this.router.url.indexOf($item.routerLink) !== -1) {
        item.$expand = true;
      }
      if ($item.children) {
        this.childrenActive($item, $item.children);
      }
    });
  }

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [LteSidebarMenu],
  exports: [LteSidebarMenu]
})
export class SidebarMenuModule {

}
