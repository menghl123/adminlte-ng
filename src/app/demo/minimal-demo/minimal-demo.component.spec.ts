import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimalDemoComponent } from './minimal-demo.component';

describe('MinimalDemoComponent', () => {
  let component: MinimalDemoComponent;
  let fixture: ComponentFixture<MinimalDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimalDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimalDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
