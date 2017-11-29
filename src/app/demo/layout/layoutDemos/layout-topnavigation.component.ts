import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../../../components/common/model';
import {demoMenuItems} from '../../demo.menu';

@Component({
  selector: 'app-layout-topnavigation',
  templateUrl: './layout-topnavigation.component.html'
})
export class LayoutTopnavigationComponent implements OnInit {
  menuItems: MenuItem[]
  breadcrumbsMenuItems: MenuItem[];
  pageInfo: any;

  constructor() {
    this.menuItems = [];
    this.menuItems.push({
      label: '用户',
      children: [
        {label: '注册'},
        {label: '登录'},
      ]
    });
    this.pageInfo = {
      pageTitle: 'Top Navigation',
      pageDescription: 'Example'
    }
    this.breadcrumbsMenuItems = [{
      icon: 'fa-dashboard',
      label: '主页',
      routerLink: '/index'
    },
      {
        label: '布局',
        routerLink: '/index/layout'
      },
      {
        label: 'Top Navigation',
        routerLink: '/index/layout-topnavigation',
        $routerLinkActive: true
      }
    ]
  }

  ngOnInit() {
  }

}
