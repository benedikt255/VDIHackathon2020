import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VdiTestComponent } from './vdi-test.component';

describe('VdiTestComponent', () => {
  let component: VdiTestComponent;
  let fixture: ComponentFixture<VdiTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VdiTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VdiTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
