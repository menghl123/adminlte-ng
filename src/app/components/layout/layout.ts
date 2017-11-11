import {Component, EventEmitter, HostListener, Input, NgModule, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminlteNGConfig} from '../adminlte.config';
import {DomHandler} from '../dom/domhandler';
import {DocumentRef} from '../window-ref/document-ref.service';
import {WindowRef} from '../window-ref/window-ref.service';

@Component({
  selector: 'lte-wrapper',
  template: `
    <div class="wrapper">
      <ng-content></ng-content>
    </div>
  `
})
export class LteWrapper implements OnInit {
  @Input()
  type: 'topNavigation' | 'boxed' | 'fixed';
  @Input()
  skin: 'blue' | 'black' | 'purple' | 'green' | 'red' | 'yellow' | 'blue-light' | 'black-light' | 'purple-light' | 'green-light' | 'red-light' | 'yellow-light';


  constructor(private adminlteNGConfig: AdminlteNGConfig,
              private documentRef: DocumentRef,
              private domHandler: DomHandler) {
    this.type = <any>this.adminlteNGConfig.layout.type;
    this.skin = <any>this.adminlteNGConfig.layout.skin;
  }

  ngOnInit(): void {
    this.domHandler.addClass(this.documentRef.body, `skin-${this.skin}`);
    let classStyle;
    if (this.type === 'topNavigation') {
      classStyle = 'hold-transition layout-top-nav';
    } else if (this.type === 'boxed') {
      classStyle = 'hold-transition layout-boxed sidebar-mini';
    } else if (this.type === 'fixed') {
      classStyle = 'hold-transition fixed sidebar-mini';
    }
    this.domHandler.addMultipleClasses(this.documentRef.body, classStyle);
  }

}

@Component({
  selector: 'lte-header',
  template: `
    <header class="main-header">
      <ng-content></ng-content>
    </header>
  `
})
export class LteHeader {
}

@Component({
  selector: 'lte-sidebar',
  template: `
    <aside class="main-sidebar">
      <section class="sidebar">
        <ng-content></ng-content>
      </section>
    </aside>
  `
})
export class LteSidebar implements OnInit {
  @Input()
  collapse: boolean;
  @Input()
  collapsed: boolean;
  @Output()
  onCollapse: EventEmitter<boolean> = new EventEmitter();

  sidebarClass: string;

  constructor(private adminlteNGConfig: AdminlteNGConfig,
              private documentRef: DocumentRef,
              private domHandler: DomHandler,
              private windowRef: WindowRef) {
    this.collapse = this.adminlteNGConfig.layout.collapse;
    this.collapsed = this.adminlteNGConfig.layout.collapsed;
    this.sidebarClass = this.adminlteNGConfig.layout.sidebarClass;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(e) {
    if (this.windowRef.innerWidth < 768) {
      this.sidebarClass = 'sidebar-open';
    } else {
      this.sidebarClass = 'sidebar-collapse';
    }
  }

  toggle() {
    if (this.collapse) {
      this.collapsed = !this.collapsed;
      if (this.collapsed) {
        this.domHandler.addClass(this.documentRef.body, this.sidebarClass);
      } else {
        this.domHandler.removeClass(this.documentRef.body, this.sidebarClass);
      }
      this.onCollapse.emit(this.collapsed)
    }
  }

  ngOnInit(): void {
    if (this.collapse) {
      if (this.collapsed) {
        this.domHandler.addClass(this.documentRef.body, 'sidebar-collapse');
      }
    }
  }

}

@Component({
  selector: 'lte-content-wrapper',
  template: `
    <div class="content-wrapper">
      <ng-content></ng-content>
    </div>
  `
})
export class LteContentWrapper {
}

@Component({
  selector: 'lte-content-header',
  template: `
    <section class="content-header">
      <ng-content></ng-content>
    </section>
  `
})
export class LteContentHeader {
}

@Component({
  selector: 'lte-content-body',
  template: `
    <section class="content">
      <ng-content></ng-content>
    </section>
  `
})
export class LteContentBody {
}

@Component({
  selector: 'lte-footer',
  template: `
    <footer class="main-footer">
      <ng-content></ng-content>
    </footer>
  `
})
export class LteFooter {
}

@Component({
  selector: 'lte-control-sidebar',
  template: `
    <aside class="control-sidebar control-sidebar-dark">
      <ng-content></ng-content>
    </aside>
  `
})
export class LteControlSidebar {
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LteControlSidebar,
    LteWrapper,
    LteHeader,
    LteFooter,
    LteSidebar,
    LteContentWrapper,
    LteContentHeader,
    LteContentBody
  ],
  exports: [
    LteControlSidebar,
    LteWrapper,
    LteHeader,
    LteFooter,
    LteSidebar,
    LteContentWrapper,
    LteContentHeader,
    LteContentBody
  ]
})
export class LayoutModule {

}
