import {Component, ViewContainerRef} from '@angular/core';
import {AdminlteNGConfig} from './components/adminlte.config';
import {MenuItem} from './components/common/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems: MenuItem[];

  constructor(private adminlteNGConfig: AdminlteNGConfig, private viewContainerRef: ViewContainerRef) {
    this.adminlteNGConfig.rootContainer = this.viewContainerRef;
    this.menuItems = [
      {
        routerLink: '1221',
        label: '8888',
        icon: 'fa-home'
      },
      {
        routerLink: '777',
        label: '7788',
        icon: 'fa-home'
      },
      {
        label: '666',
        icon: 'fa-home',
        children: [{
          routerLink: '1221',
          label: '555',
          icon: 'fa-home'
        }, {
          routerLink: '1221',
          label: '444',
          icon: 'fa-home'
        }]
      },
      {
        label: '333',
        icon: 'fa-home',
        children: [{
          routerLink: '1221',
          label: '222',
          icon: 'fa-home'
        }, {
          label: '111',
          icon: 'fa-home',
          children: [{
            routerLink: '1221',
            label: '222',
            icon: 'fa-home'
          }, {
            routerLink: '1221',
            label: '111',
            icon: 'fa-home'
          }]
        }]
      }
    ]
  }

  onListen(val) {
    console.log(val);
  }
}
