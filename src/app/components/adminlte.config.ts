import {Injectable, ViewContainerRef} from '@angular/core';

@Injectable()
export class AdminlteNGConfig {

  rootContainer: ViewContainerRef;

  layout = {
    type: 'fixed',
    skin: 'red',
    collapse: true,
    collapsed: false,
    sidebarClass: 'sidebar-collapse'
  }

  sidebarMenu = {
    isAccordion: false,
  }

}
