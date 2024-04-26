import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDutyGradingComponent } from './edit-duty-grading.component';

describe('EditDutyGradingComponent', () => {
  let component: EditDutyGradingComponent;
  let fixture: ComponentFixture<EditDutyGradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditDutyGradingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditDutyGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
