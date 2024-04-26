import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleFamilyContainerComponent } from './single-family-container.component';

describe('SingleFamilyContainerComponent', () => {
  let component: SingleFamilyContainerComponent;
  let fixture: ComponentFixture<SingleFamilyContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleFamilyContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleFamilyContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
