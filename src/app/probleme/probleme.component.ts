import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators , FormGroup, EmailValidator, MinLengthValidator } from '@angular/forms';
import { emailMatcherValidator } from '../shared/valiaterzones/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/valiaterzones/longueur-minimum.component';
import { IProbleme } from './probleme';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './typeprobleme';
import { TypeproblemeService } from './typeprobleme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  
  problemeForm: FormGroup;
  errorMessage: string;
  typesProbleme: ITypeProbleme[];
  probleme: IProbleme;
  
  constructor(private fb: FormBuilder, private typeproblemeService: TypeproblemeService, private problemeService: ProblemeService, private route : Router ) { }
  
  ngOnInit() {
  this.problemeForm = this.fb.group({

    prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],   
    nom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],   

    descriptionProbleme:['',[Validators.required, Validators.minLength(5)]],
    noUnite:"", 
    dateProbleme:{value:Date(), disabled:true},

    // noTypeProbleme: ['', Validators.required], 
   
    noTypeProbleme:[''],
    courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
    telephone: [{value: '', disabled: true}],

    notification: ['pasnotification'],
    })
    this.problemeForm.get('notification').valueChanges
    .subscribe(value => this.gestionNotification(value));
  
    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
                   error => this.errorMessage = <any>error);  
  }
  save(): void{
    if (this.problemeForm.dirty && this.problemeForm.valid) {
      // Copy the form values over the problem object values
      this.probleme = this.problemeForm.value;
      this.probleme.id = 0;
       if(this.problemeForm.get('courrielGroup.courriel').value != '')
      {
        this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
      }
  
      this.problemeService.saveProbleme(this.probleme)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
        })
  } else if (!this.problemeForm.dirty) {
      this.onSaveComplete();
  }
  } 
  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
    this.route.navigate(['/accueil']);
  }

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
     
      if(typeNotification === 'telephone' || typeNotification === 'parMessage' )
      {
        telephone.setValidators([Validators.required, Validators.pattern('[0-9]+')]);       
        telephone.setValidators([Validators.required,VerifierCaracteresValidator.longueurMinimum(10),Validators.maxLength(10)]);      
        telephone.enable();     
      }
      else if(typeNotification === 'inconnu'){

        telephone.setValidators([Validators.required,Validators.pattern('[0-9]+'),Validators.maxLength(10),Validators.minLength(10)]);  
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

  