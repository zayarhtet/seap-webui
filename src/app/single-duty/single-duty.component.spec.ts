import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDutyComponent } from './single-duty.component';

describe('SingleDutyComponent', () => {
  let component: SingleDutyComponent;
  let fixture: ComponentFixture<SingleDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleDutyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
