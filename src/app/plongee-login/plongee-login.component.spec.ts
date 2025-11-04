import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlongeeLoginComponent } from './plongee-login.component';

describe('PlongeeLoginComponent', () => {
  let component: PlongeeLoginComponent;
  let fixture: ComponentFixture<PlongeeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlongeeLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlongeeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
