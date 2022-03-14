import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TEST #1
  it('#1 Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

   //TEST #2
  it('#2 Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

   //TEST #3
  it('#3 Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    let errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

   //TEST #4
  it('#4 Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm.controls['prenom'];
    let errors = zone.errors;
    expect(errors['required']).toBeTruthy();
  });

   //TEST #5
  it('#5 Zone PRÉNOM valide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    let errors = zone.errors || {};
    
    expect(zone.valid).toBeTruthy();
  });

   //TEST #6
  it('#6 Zone PRÉNOM valide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + 'a'.repeat(1));
    let errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });
});
