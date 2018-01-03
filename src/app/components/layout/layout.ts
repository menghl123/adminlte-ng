import {Component, EventEmitter, HostListener, Input, NgModule, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminlteNGConfig} from '../adminlte.config';
import {DomHandler} from '../dom/domhandler';
import {DocumentRef} from '../window-ref/document-ref.service';
import {WindowRef} from '../window-ref/window-ref.service';

@Component({
  selector: 'lte-wrapper',
  template: `
    <div class="wrapper" style="height: 100%; overflow: auto">
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
    this.domHandler.changeSkin(this.skin);
    this.domHandler.removeClass(this.documentRef.body, 'layout-top-nav');
    this.domHandler.removeClass(this.documentRef.body, 'layout-boxed');
    this.domHandler.removeClass(this.documentRef.body, 'fixed');
    this.domHandler.removeClass(this.documentRef.body, 'sidebar-mini');
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
    this.initSidebarClass();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(e) {
    this.initSidebarClass();
  }

  private initSidebarClass() {
    if (this.windowRef.innerWidth < 768) {
      this.sidebarClass = 'sidebar-open';
      this.collapsed = false;
      this.domHandler.removeClass(this.documentRef.body, this.sidebarClass);
    } else {
      this.sidebarClass = 'sidebar-collapse';
      this.collapse = true;
      this.domHandler.removeClass(this.documentRef.body, this.sidebarClass);
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
  selector: 'lte-control-sidebar ',
  template: `
    <aside class="control-sidebar  {{collapsed ? sidebarClass : '' }} control-sidebar-dark">
      <h4 class="control-sidebar-heading">Skins</h4>
      <ul class="list-unstyled clearfix">
        <li (click)="changeSkin('blue')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)" data-skin="skin-blue"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px; background: #367fa9"></span><span
            class="bg-light-blue" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin">Blue</p></li>
        <li (click)="changeSkin('black')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)" data-skin="skin-black"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div style="box-shadow: 0 0 2px rgba(0,0,0,0.1)" class="clearfix"><span
            style="display:block; width: 20%; float: left; height: 7px; background: #fefefe"></span><span
            style="display:block; width: 80%; float: left; height: 7px; background: #fefefe"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #222"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin">Black</p></li>
        <li (click)="changeSkin('purple')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)" data-skin="skin-purple"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-purple-active"></span><span
            class="bg-purple" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin">Purple</p></li>
        <li (click)="changeSkin('green')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)" data-skin="skin-green"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-green-active"></span><span
            class="bg-green" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin">Green</p></li>
        <li (click)="changeSkin('red')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)" data-skin="skin-red"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-red-active"></span><span
            class="bg-red" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin">Red</p></li>
        <li (click)="changeSkin('yellow')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)" data-skin="skin-yellow"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-yellow-active"></span><span
            class="bg-yellow" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #222d32"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin">Yellow</p></li>
        <li (click)="changeSkin('blue-light')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)" data-skin="skin-blue-light"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px; background: #367fa9"></span><span
            class="bg-light-blue" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin" style="font-size: 12px">Blue Light</p></li>
        <li (click)="changeSkin('black-light')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)"
                                                                   data-skin="skin-black-light"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div style="box-shadow: 0 0 2px rgba(0,0,0,0.1)" class="clearfix"><span
            style="display:block; width: 20%; float: left; height: 7px; background: #fefefe"></span><span
            style="display:block; width: 80%; float: left; height: 7px; background: #fefefe"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin" style="font-size: 12px">Black Light</p></li>
        <li (click)="changeSkin('purple-light')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)"
                                                                   data-skin="skin-purple-light"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-purple-active"></span><span
            class="bg-purple" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin" style="font-size: 12px">Purple Light</p></li>
        <li (click)="changeSkin('green-light')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)"
                                                                   data-skin="skin-green-light"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-green-active"></span><span
            class="bg-green" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin" style="font-size: 12px">Green Light</p></li>
        <li (click)="changeSkin('red-light')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)" data-skin="skin-red-light"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-red-active"></span><span
            class="bg-red" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin" style="font-size: 12px">Red Light</p></li>
        <li (click)="changeSkin('yellow-light')" style="float:left; width: 33.33333%; padding: 5px;"><a href="javascript:void(0)"
                                                                   data-skin="skin-yellow-light"
                                                                   style="display: block; box-shadow: 0 0 3px rgba(0,0,0,0.4)"
                                                                   class="clearfix full-opacity-hover">
          <div><span style="display:block; width: 20%; float: left; height: 7px;" class="bg-yellow-active"></span><span
            class="bg-yellow" style="display:block; width: 80%; float: left; height: 7px;"></span></div>
          <div><span style="display:block; width: 20%; float: left; height: 20px; background: #f9fafc"></span><span
            style="display:block; width: 80%; float: left; height: 20px; background: #f4f5f7"></span></div>
        </a>
          <p class="text-center no-margin" style="font-size: 12px">Yellow Light</p></li>
      </ul>
    </aside>
  `
})
export class LteControlSidebar {
  @Input()
  collapsed: boolean;
  @Output()
  onCollapse: EventEmitter<boolean> = new EventEmitter();

  sidebarClass: string;

  constructor(private adminlteNGConfig: AdminlteNGConfig,
              private domHandler: DomHandler) {
    this.sidebarClass = this.adminlteNGConfig.layout.controlSidebarClass;
    this.collapsed = this.adminlteNGConfig.layout.controlSidebarCollapesd;
  }

  changeSkin(skin: string): void {
    this.domHandler.changeSkin(skin);
  }

  toggle() {
    this.collapsed = !this.collapsed;
    this.onCollapse.emit(this.collapsed)
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
    LteContentBody,
  ],
  exports: [
    LteControlSidebar,
    LteWrapper,
    LteHeader,
    LteFooter,
    LteSidebar,
    LteContentWrapper,
    LteContentHeader,
    LteContentBody,
  ]
})
export class LayoutModule {

}
