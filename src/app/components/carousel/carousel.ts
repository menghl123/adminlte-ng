import {
  Component, ChangeDetectionStrategy, QueryList, ContentChildren, Input, Output,
  EventEmitter, HostListener, AfterContentInit, OnDestroy, Renderer2, ViewChildren, ElementRef, NgModule, Directive,
  TemplateRef
} from '@angular/core';
import { animation, animationTimeout } from '../utils/animation-utils';
import {AdminlteNGConfig} from '../adminlte.config';
import {CommonModule} from '@angular/common';
@Directive({
  selector: 'ng-template[lteSlide]',
})
export class SlideDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }

}
export enum CarouselDirection {
  NEXT, PREV
}

@Component({
  selector: 'lte-carousel',
  template: `
    <div class="carousel slide" data-ride="carousel" tabIndex="0">
      <ol class="carousel-indicators">
        <li *ngFor="let silde of slides; let $index = index" [attr.data-slide-to]="$index"
            (click)="selectSlide($index)" [ngClass]="{active: $index == activeSlide}"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div #slideItem *ngFor="let silde of slides; let $index = index"
             class="item" [ngClass]="{active: $index == activeSlide}">
          <ng-template [ngTemplateOutlet]="silde.templateRef"> </ng-template>
        </div>
      </div>

      <a class="left carousel-control" role="button" data-slide="prev" (click)="selectPrevSlide()">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" role="button" data-slide="next" (click)="selectNextSlide()">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'carousel'
})
export class CarouselComponent implements AfterContentInit, OnDestroy {

  @Input() activeSlide = 0;
  @Input() interval: number;
  @Input() animate: boolean;
  @Output() activeSlideChange = new EventEmitter<number>();
  @ContentChildren(SlideDirective) slides: QueryList<SlideDirective>;
  @ViewChildren('slideItem') slideItems: QueryList<ElementRef>;
  intervalId: any;
  reflowDuration: number;
  animationDuration: number;

  constructor(private renderer: Renderer2, private adminlteNGConfig: AdminlteNGConfig) {
    this.reflowDuration = adminlteNGConfig.carousel.reflowDuration;
    this.animationDuration = adminlteNGConfig.carousel.animationDuration;
    this.animate = adminlteNGConfig.carousel.animate;
    this.interval = adminlteNGConfig.carousel.interval;
  }

  ngAfterContentInit(): void {
    if (this.interval) {
      this.startInterval();
    }
  }

  selectSlide(index) {
    if (this.activeSlide !== index) {
      const direction = index > this.activeSlide ? CarouselDirection.NEXT : CarouselDirection.PREV;
      this.onActiveSlideChange(index, direction);
    }
  }

  @HostListener('keydown.arrowLeft', ['$event'])
  selectPrevSlide($event?: Event) {
    if (this.activeSlide === 0) {
      this.onActiveSlideChange(this.slides.length - 1, CarouselDirection.PREV);
      return;
    }

    this.onActiveSlideChange(this.activeSlide - 1, CarouselDirection.PREV);
  }

  @HostListener('keydown.arrowRight', ['$event'])
  selectNextSlide($event?: Event) {
    if (this.activeSlide === this.slides.length - 1) {
      this.onActiveSlideChange(0, CarouselDirection.NEXT);
      return;
    }
    this.onActiveSlideChange(this.activeSlide + 1, CarouselDirection.NEXT);
  }

  onActiveSlideChange(index, carouselDirection: CarouselDirection) {
    if (this.activeSlide === index) {
      return;
    }

    this.slideAnimation(carouselDirection, index)
      .then(() => {
        this.activeSlide = index;
        this.activeSlideChange.emit(this.activeSlide);
      });
  }

  @HostListener('mouseenter', [])
  pauseInterval() {
    this.stopInterval();
  }

  @HostListener('mouseleave', [])
  startInterval() {
    this.stopInterval();
    if (this.interval) {
      this.intervalId = setInterval(() => this.selectNextSlide(), this.interval);
    }
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  private slideAnimation(carouselDirection: CarouselDirection, index) {
    this.stopInterval();
    const slideItems = this.slideItems.toArray();
    const direction = carouselDirection === CarouselDirection.NEXT ? 'left' : 'right';
    const orderDirection = carouselDirection === CarouselDirection.NEXT ? 'next' : 'prev';

    const nextElement = slideItems[index].nativeElement;
    const currentElement = slideItems[this.activeSlide].nativeElement;
    this.renderer.addClass(nextElement, orderDirection);

    return animationTimeout(this.reflowDuration)
      .then(() => {
        this.renderer.addClass(currentElement, direction);
        this.renderer.addClass(nextElement, direction);
      })
      .then(() => animation(this.renderer, nextElement, this.animationDuration))
      .then(() => {
        this.renderer.removeClass(nextElement, orderDirection);
        this.renderer.removeClass(nextElement, direction);
        this.renderer.removeClass(currentElement, direction);
        this.startInterval();
      });
  }

  private stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}


@NgModule({
  imports: [CommonModule],
  exports: [CarouselComponent, SlideDirective],
  declarations: [CarouselComponent, SlideDirective],
  providers: [],
})
export class CarouselModule {
}
