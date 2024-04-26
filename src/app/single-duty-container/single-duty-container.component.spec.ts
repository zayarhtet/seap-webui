import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDutyContainerComponent } from './single-duty-container.component';

describe('SingleDutyContainerComponent', () => {
  let component: SingleDutyContainerComponent;
  let fixture: ComponentFixture<SingleDutyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleDutyContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleDutyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
