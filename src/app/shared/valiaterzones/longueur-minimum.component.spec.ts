// 7 - 14

import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";
describe('longueur-minimum-component', () => {
   // TEST #7
   it('#7 | Une chaîne avec 10 espaces est invalide', () => {
    let control = { value: ' '.repeat(10) }
    let validatorFn =  VerifierCaracteresValidator.longueurMinimum(3);
    let result= validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBe(true);
  });
     // TEST #8
     it('#8 | Une phrase avec des mots est valide', () => {
      let control = { value: 'abcr' }
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
});