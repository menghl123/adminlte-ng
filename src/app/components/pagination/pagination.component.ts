import {
  Component, Input, Output, EventEmitter, OnChanges, ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import {AdminlteNGConfig} from '../adminlte.config';

@Component({
  selector: 'lte-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  exportAs: 'pagination',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {
  static EFFECT_PAGE_RANGE_KEYS = ['total', 'pageSize', 'pageIndex', 'maxItems'];

  @Input() boundary: boolean;
  @Input() total = 0;
  @Input() pageSize: number;
  @Input() pageIndex = 1;
  @Output() pageIndexChange = new EventEmitter<number>();
  @Input() maxItems: number;
  @Input() firstLink: string;
  @Input() lastLink: string;
  @Input() preLink: string;
  @Input() nextLink: string;
  @Input() size: '' | 'lg' | 'sm';
  @Input() cssClass: string;
  showPages = [];
  totalPage = 0;

  constructor(private adminlteNGConfig: AdminlteNGConfig) {
    this.boundary = adminlteNGConfig.pagination.boundary;
    this.pageSize = adminlteNGConfig.pagination.pageSize;
    this.maxItems = adminlteNGConfig.pagination.maxItems;
    this.firstLink = adminlteNGConfig.pagination.button.first;
    this.lastLink = adminlteNGConfig.pagination.button.last;
    this.preLink = adminlteNGConfig.pagination.button.pre;
    this.nextLink = adminlteNGConfig.pagination.button.next;
    this.size = <any>adminlteNGConfig.pagination.size;
  }

  first() {
    if (this.pageIndex !== 1) {
      this.onPageIndexChange(1);
    }
  }

  last() {
    const last = Math.max(this.totalPage, 1);
    if (this.pageIndex !== last) {
      this.onPageIndexChange(last);
    }
  }

  prev(): void {
    if (this.hasPrev()) {
      this.onPageIndexChange(this.pageIndex - 1);
    }
  }

  next(): void {
    if (this.hasNext()) {
      this.onPageIndexChange(this.pageIndex + 1);
    }
  }

  preRange() {
    const pre = this.showPages[0] - 1;
    this.onPageIndexChange(Math.max(pre, 1));
  }

  nextRange() {
    const next = this.showPages[this.showPages.length - 1] + 1;
    this.onPageIndexChange(Math.min(next, this.totalPage));
  }

  onPageIndexChange(pageIndex: number) {
    if (this.pageIndex !== pageIndex) {
      this.pageIndexChange.emit(pageIndex);
    }
  }

  hasPrev(): boolean {
    return this.pageIndex > 1;
  }

  hasNext(): boolean {
    return this.pageIndex < this.totalPage;
  }

  private getTotalPage(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const shouldUpdateRanges = PaginationComponent.EFFECT_PAGE_RANGE_KEYS.some(key => !!changes[key]);
    if (shouldUpdateRanges) {
      this.totalPage = this.getTotalPage();
      this.pageIndex = Math.max(Math.min(this.pageIndex, this.totalPage), 1);
      this.updateShowPageRange();
    }
  }

  private updateShowPageRange() {
    if (!this.totalPage) {
      this.showPages = [];
      return;
    }

    if (this.totalPage <= this.maxItems) {
      this.showPages = new Array<number>(this.totalPage).fill(0).map((_, i) => i + 1);
      return;
    }
    this.showPages = this.extractRange();
  }

  private extractRange() {
    const showPages = [this.pageIndex];
    let start = this.pageIndex - 1;
    let end = this.pageIndex + 1;

    const arriveLeftBound = index => index < 1;
    const arriveRightBound = (index) => index > this.totalPage;
    const fullPageRang = (pages) => pages.length >= this.maxItems;

    while (!(fullPageRang(showPages) || (arriveLeftBound(start) && arriveRightBound(end)))) {
      if (!arriveLeftBound(start)) {
        showPages.unshift((start--));
      }

      if (!fullPageRang(showPages) && !arriveRightBound(end)) {
        showPages.push(end++);
      }
    }
    return showPages;
  }
}
