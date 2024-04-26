import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewFamilyComponent } from './create-new-family.component';

describe('CreateNewFamilyComponent', () => {
  let component: CreateNewFamilyComponent;
  let fixture: ComponentFixture<CreateNewFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateNewFamilyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateNewFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
