import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDutyComponent } from './create-new-duty.component';

describe('CreateNewDutyComponent', () => {
  let component: CreateNewDutyComponent;
  let fixture: ComponentFixture<CreateNewDutyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewDutyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
