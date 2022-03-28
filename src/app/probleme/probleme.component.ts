import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators , FormGroup, EmailValidator } from '@angular/forms';
import { emailMatcherValidator } from '../shared/valiaterzones/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/valiaterzones/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';


@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  
  problemeForm: FormGroup;
  errorMessage: string;
  typesProbleme: ITypeProbleme[];
  
  constructor(private fb: FormBuilder, private typeproblemeService: TypeproblemeService ) { }

  ngOnInit() {
  this.problemeForm = this.fb.group({

    prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],   

    noTypeProbleme: ['', Validators.required], 
    courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
    telephone: [{value: '', disabled: true}],

    notification: ['pasnotification'],

    })
    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
                   error => this.errorMessage = <any>error);  
    
                   
   
  }
  save(): void{} 

  gestionNotification(typeNotification: string): void {
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');      

    const telephone = this.problemeForm.get('telephone');
      

    // Tous remettre à zéro
    courriel.clearValidators();
    courriel.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courriel.disable();  

    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();    
    courrielConfirmation.disable();

    telephone.clearValidators();
    telephone.reset();    
    telephone.disable();

    if (typeNotification === 'parCourriel') {   
            courriel.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
            courriel.enable();  
            courrielConfirmation.setValidators([Validators.required]);              
            courrielConfirmation.enable();  
            // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
            // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
            courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);                       
      }
     
      if(typeNotification === 'parTelephone' || typeNotification === 'parMessage' )
      {
        telephone.setValidators([Validators.required,Validators.pattern('[0-9]+')]);  
        telephone.setValidators([Validators.required]);   
        telephone.enable();               
      }
      else if(typeNotification === 'inconnu'){

        telephone.setValidators([Validators.required,Validators.pattern('[0-9]+')]);  
        telephone.setValidators([Validators.required]);   
        telephone.disable(); 


        courriel.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
        courriel.disable();  
        courrielConfirmation.setValidators([Validators.required]);              
        courrielConfirmation.disable();  
        courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])]);     
      }
      
    courriel.updateValueAndValidity();   
    courrielConfirmation.updateValueAndValidity();     
    
    telephone.updateValueAndValidity();     
  }
}

  