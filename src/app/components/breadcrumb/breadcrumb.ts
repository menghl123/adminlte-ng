import {Component, Input, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MenuItem} from '../common/model';

@Component({
  selector: 'lte-breadcrumb',
  template: `
    <section class="content-header" *ngIf="menuItems">
      <h1 *ngIf="pageTitle">
        {{pageTitle}}
        <small>{{pageDescription}}</small>
      </h1>
      <ol class="breadcrumb">
        <li *ngFor="let menuItem of menuItems" [ngClass]="{'active':menuItem?.$routerLinkActive}">
          <a [routerLink]="menuItem?.routerLink">
            <i *ngIf="menuItem.icon" class="fa {{menuItem?.icon}}"></i>
            {{menuItem?.label}}
          </a>
        </li>
      </ol>
    </section>
  `
})
export class LteBreadcrumb {
  @Input()
  menuItems: MenuItem[];
  @Input()
  pageTitle: string;
  @Input()
  pageDescription: string;
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [LteBreadcrumb],
  exports: [LteBreadcrumb]
})
export class BreadcrumbModule {

}
