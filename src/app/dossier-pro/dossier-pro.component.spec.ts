import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierProComponent } from './dossier-pro.component';

describe('DossierProComponent', () => {
  let component: DossierProComponent;
  let fixture: ComponentFixture<DossierProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DossierProComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
