import {
  AfterContentInit,
  Component, ContentChild, ContentChildren, Directive, EventEmitter, Input, NgModule, OnInit, Output, QueryList,
  TemplateRef
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Directive({
  selector: 'ng-template[lteTabTitle]'
})
export class LteTabTitle {
  constructor(public templateRef: TemplateRef<any>) {
  }
}

@Directive({
  selector: 'ng-template[lteTabContent]'
})
export class LteTabContent {
  constructor(public templateRef: TemplateRef<any>) {
  }
}

@Component({
  selector: 'lte-tab-item',
  template: ``
})
export class LteTabItem {
  @Input() id: number | string;
  @Input()
  title: string;
  @Input()
  content: string;
  @Input()
  disabled = false;
  @ContentChild(LteTabTitle) titleTpl: LteTabTitle;
  @ContentChild(LteTabContent) contentTpl: LteTabContent;
}

@Component({
  selector: 'lte-tab',
  template: `
    <div class="nav-tabs-custom">
      <ul class="nav nav-tabs">
        <ng-container *ngFor="let tabItem of tabItems">
          <li (click)="selectActiveTab(tabItem?.id)"
              [ngClass]="{'disabled':tabItem.disabled,'active':activeId === tabItem.id}">
            <a style="cursor: pointer">
              <ng-container *ngIf="tabItem.title">
                {{tabItem.title}}
              </ng-container>
              <ng-container *ngIf="!tabItem.title" [ngTemplateOutlet]="tabItem.titleTpl?.templateRef"></ng-container>
            </a>
          </li>
        </ng-container>
      </ul>
      <div class="tab-content">
        <ng-container *ngFor="let tabItem of tabItems">
          <div class="tab-pane" [ngClass]="{'active':activeId === tabItem.id}">
            <ng-container *ngIf="tabItem.content">
              {{tabItem.content}}
            </ng-container>
            <ng-container *ngIf="!tabItem.content" [ngTemplateOutlet]="tabItem.contentTpl?.templateRef">

            </ng-container>
          </div>
        </ng-container>
      </div>
    </div>
  `
})
export class LteTab implements AfterContentInit {
  @ContentChildren(LteTabItem) tabItems: QueryList<LteTabItem>;
  @Input() activeId: number | string;
  @Output() onTabChange: EventEmitter<string | number> = new EventEmitter();

  selectActiveTab(id: number | string) {
    const tab = this.tabItems.find(item => item.id === id);
    if (tab && !tab.disabled) {
      this.activeId = tab.id;
      this.onTabChange.emit(this.activeId);
    }
  }

  ngAfterContentInit(): void {
    if (!this.activeId && this.tabItems.length) {
      this.selectActiveTab(this.tabItems.first.id);
    }
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LteTab, LteTabItem, LteTabTitle, LteTabContent],
  exports: [LteTab, LteTabItem, LteTabTitle, LteTabContent]
})
export class TabModule {

}
