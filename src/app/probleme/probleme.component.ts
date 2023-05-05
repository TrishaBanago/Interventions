import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeproblemeService } from './typeprobleme.service';
import { ITypeProbleme } from './typeprobleme';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private pf: FormBuilder, private typeproblemeService: TypeproblemeService){}

  ngOnInit(){
    this.problemeForm = this.pf.group({
      prenom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['' , [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      typeProbleme: ['', [Validators.required]],
      courrielGroup: this.pf.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}],
      notification: [''],
      descriptionProbleme:["", [Validators.required, Validators.minLength(5)]],
      noUnite: "",
      dateProbleme: {value:Date(), disabled:true}

    });

    this.typeproblemeService.obtenirTypesProbleme()
        .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
                   error => this.errorMessage = <any>error);  

       this.problemeForm.get('notification').valueChanges
         .subscribe(value => this.appliquerNotification(value))
  }
  save(): void {
  }
  appliquerNotification(typeNotification: string): void {
    
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');

    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephoneControl.disable();
    if (typeNotification === 'Courriel') {   
            courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
            courrielControl.enable();  
            courrielConfirmationControl.setValidators([Validators.required]);              
            courrielConfirmationControl.enable();  
            // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
            // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
            //datesGroupControl.setValidators([Validators.compose([datesValides])]);                       
      }   
      else
      {
        if(typeNotification === 'Telephone')
        {
          telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'),Validators.minLength(10),Validators.maxLength(10)]);      
          telephoneControl.enable();           
        }
      }
    courrielControl.updateValueAndValidity();   
    courrielConfirmationControl.updateValueAndValidity();         
  }
}

