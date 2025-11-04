import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlongeeRegisterComponent } from './plongee-register.component';

describe('PlongeeRegisterComponent', () => {
  let component: PlongeeRegisterComponent;
  let fixture: ComponentFixture<PlongeeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlongeeRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlongeeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
