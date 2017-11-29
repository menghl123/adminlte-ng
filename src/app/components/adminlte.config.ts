import {Injectable, ViewContainerRef} from '@angular/core';

@Injectable()
export class AdminlteNGConfig {

  rootContainer: ViewContainerRef;

  layout = {
    type: 'fixed',
    skin: 'blue',
    collapse: true,
    collapsed: false,
    sidebarClass: 'sidebar-collapse',
    controlSidebarClass: 'control-sidebar-open',
    controlSidebarCollapesd: false,
  };

  sidebarMenu = {
    isAccordion: false,
  };

  navbar = {
    position: 'left',
    collapsed: true
  };

  box = {
    withBorder: false,
    type: 'default',
    inAccordion: false,
    collapse: false,
    collapsed: false,
  };

  accordion: {
    showOneItem: true;
  }

  autoComplete = {
    delay: 300,
    minLength: 3,
    itemTemplate: null,
    noResultItemTemplate: null,
    formatter: (item) => item ? (item.label || item.toString()) : '',
    valueParser: (item) => item
  };

  button = {
    type: 'default',
    open: false,
  };

  alertBox = {
    type: 'info',
    closable: false,
    closed: false,
    iconData: {
      'danger': 'fa-ban',
      'info': 'fa-info',
      'warning': 'fa-warning',
      'success': 'fa-check',
    },
    showTitle: true
  };

  progressBar = {
    type: 'primary',
    size: '',
    striped: false,
    animate: false,
    max: 100,
    min: 0,
  };

  carousel = {
    interval: 0,
    animate: false,
    reflowDuration: 30,
    animationDuration: 600
  };

}
