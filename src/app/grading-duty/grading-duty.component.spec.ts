import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingDutyComponent } from './grading-duty.component';

describe('GradingDutyComponent', () => {
  let component: GradingDutyComponent;
  let fixture: ComponentFixture<GradingDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradingDutyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GradingDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
