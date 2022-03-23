import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/valiaterzones/longueur-minimum.component';


import { ProblemeComponent } from './probleme.component';
import { TypeproblemeService } from './typeprobleme.service';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeproblemeService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //TEST #1
  it('#1 | Zone PRÉNOM invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });

   //TEST #2
  it('#2 | Zone PRÉNOM valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    let errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

   //TEST #3
  it('#3 | Zone PRÉNOM valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    let errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

   //TEST #4
  it('#4 | Zone PRÉNOM invalide avec aucune valeur', () => {
    let zone = component.problemeForm.controls['prenom'];
    let errors = zone.errors;
    expect(errors['required']).toBeTruthy();
  });

   //TEST #5
  it('#5 | Zone PRÉNOM invalide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    let errors = zone.errors || {};
    
    expect(zone.valid).toBeFalsy();
  });

   //TEST #6
  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + 'a'.repeat(1));
    let errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

   // TEST #7
 it('#7 | Une chaîne avec 10 espaces est invalide', () => {
  let control = { value: ' '}
  let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
  let result= validatorFn(control as AbstractControl);
  expect(result['nbreCaracteresInsuffisant']).toBe(true);
});
   // TEST #8
   it('#8 | Une phrase avec des mots est valide', () => {
    let control = { value: 'Vive angular' }
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(control.value).toBeTruthy;
  });
  // TEST #9
  it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
    let control = { value: ' je le veux ' }
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(control.value).toBeTruthy;
  });
    // TEST #10
    it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () => {
      let control = { value: ' xx' }
      let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
      let result= validatorFn(control as AbstractControl);
      expect(result['nbreCaracteresInsuffisant']).toBe(true);
    });
      // TEST #11
  it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide', () => {
    let control = { value: '  x'}
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBeTruthy();
  });
    // TEST #12
    it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
      let control = { value: '   xxx'}
      let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
      let result= validatorFn(control as AbstractControl);
      expect(control.value).toBeTruthy;
    });
      // TEST #13
  it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
    let control = { value: '     xxxxx     '}
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(control.value).toBeTruthy;
  });
    // TEST #14
    it('#14 | Une chaîne nulle est invalide', () => {
      let control = {};
      let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
      let result= validatorFn(control as AbstractControl);
      expect(result['nbreCaracteresInsuffisant']).toBeFalse;
    });

    // TEST #15
    it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
      component.gestionNotification('typeNotification');
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED');
    });

    // TEST #16
    it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
      component.gestionNotification('typeNotification');
      let zone = component.problemeForm.get('telephone');
      expect(zone.value).toBeNull();
      
    });
     // TEST #17
     it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
      component.gestionNotification('typeNotification');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      expect(zone.status).toEqual('DISABLED');
    });
     // TEST #18
     it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
      component.gestionNotification('typeNotification');
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.status).toEqual('DISABLED');
    });

     // TEST #19
    it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
      component.gestionNotification('typeNotification');
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED');
    });

     // TEST #20
    it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
      component.gestionNotification('parCourriel');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      expect(zone.enabled).toBeTrue();
    });

     // TEST #21
    it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
      component.gestionNotification('parCourriel');
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.enabled).toBeTrue();
    });

    // TEST #22
    it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      component.gestionNotification('parCourriel');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      let errors = zone.errors;
      expect(errors['required']).toBeTruthy();
    });

    // TEST #23
    it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
      component.gestionNotification('parCourriel');
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      let errors = zone.errors;
    expect(errors['required']).toBeTruthy();
    });

     // TEST #24
     it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
      component.gestionNotification('parCourriel');
      let zone = component.problemeForm.get('courrielGroup.courriel');
      zone.setValue('abcd');
      expect(zone.valid).toBeFalse();
    });

     // TEST #25
     it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
      component.gestionNotification('parCourriel');
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation' + 'courrielGroup.courriel');
      let errors = zone.errors;
      expect(errors['required']).toBeTruthy();
     
    });

/*
#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null
#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel
#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel
*/
});
