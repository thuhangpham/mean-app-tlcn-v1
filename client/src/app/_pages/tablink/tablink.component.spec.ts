import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablinkComponent } from './tablink.component';

describe('TablinkComponent', () => {
  let component: TablinkComponent;
  let fixture: ComponentFixture<TablinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
