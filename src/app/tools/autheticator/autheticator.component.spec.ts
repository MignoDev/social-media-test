import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutheticatorComponent } from './autheticator.component';

describe('AutheticatorComponent', () => {
  let component: AutheticatorComponent;
  let fixture: ComponentFixture<AutheticatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutheticatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutheticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
