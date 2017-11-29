import {MenuItem} from '../components/common/model';

export const demoMenuItems: MenuItem[] = [
  {
    isHeader: true,
    label: 'main menu'
  },
  {
    label: 'layout',
    icon: 'fa-files-o',
    children: [
      {
        routerLink: 'layout-topnavigation',
        label: 'Top Navigation',
        icon: 'fa-files-o',
      },
    ]
  }, {
    routerLink: 'tab',
    label: 'tab',
    icon: 'fa-files-o'
  },{
    routerLink: 'box',
    label: 'box',
    icon: 'fa-files-o'
  },{
    routerLink: 'accordion',
    label: 'accordion',
    icon: 'fa-files-o'
  },{
    routerLink: 'autocomplete',
    label: 'autocomplete',
    icon: 'fa-files-o'
  },{
    routerLink: 'splitButton',
    label: 'splitButton',
    icon: 'fa-files-o'
  },{
    routerLink: 'alerBox',
    label: 'alerBox',
    icon: 'fa-files-o'
  },{
    routerLink: 'progressBar',
    label: 'progressBar',
    icon: 'fa-files-o'
  },{
    routerLink: 'carousel',
    label: 'carousel',
    icon: 'fa-files-o'
  }

]
