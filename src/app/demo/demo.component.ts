import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../components/common/model';
import {demoMenuItems} from './demo.menu';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  menuItems: MenuItem[];
  breadcrumbsMenuItems: MenuItem[];
  pageInfo: any;

  constructor() {
    this.menuItems = demoMenuItems;
    this.pageInfo = {
      pageTitle: '布局',
      pageDescription: 'layout options'
    }
    this.breadcrumbsMenuItems = [{
      icon: 'fa-dashboard',
      label: '主页',
      routerLink: '/index'
    },
      {
        label: '布局',
        routerLink: '/index/layout'
      }
    ]
  }

  onListen(val) {
    console.log(val);
  }

  ngOnInit() {
  }

}
