import { NumberSymbol } from "@angular/common";

export interface IProbleme {
    
    id: number,
    prenom: string,
    nom: string,
    noTypeProbleme: Number,
    courriel?: string
  //  courrielConfirmation?: string,
    telephone?: string,
    notification: string,
    noUnite?: string,
    descriptionProbleme: string
 //   dateProbleme?: Date

}