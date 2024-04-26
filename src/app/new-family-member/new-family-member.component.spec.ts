import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFamilyMemberComponent } from './new-family-member.component';

describe('NewFamilyMemberComponent', () => {
  let component: NewFamilyMemberComponent;
  let fixture: ComponentFixture<NewFamilyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewFamilyMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFamilyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
