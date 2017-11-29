import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDemoComponent } from './box-demo.component';

describe('BoxDemoComponent', () => {
  let component: BoxDemoComponent;
  let fixture: ComponentFixture<BoxDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
