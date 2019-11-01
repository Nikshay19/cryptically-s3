import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivypolicyComponent } from './privypolicy.component';

describe('PrivypolicyComponent', () => {
  let component: PrivypolicyComponent;
  let fixture: ComponentFixture<PrivypolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivypolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
