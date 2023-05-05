import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { HttpClientModule } from '@angular/common/http';
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

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#1 | Zone PRÉNOM invalide avec 2 caractères',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2))
    expect(zone.valid).toBeFalsy();
  });
  it('#2 | Zone PRÉNOM valide avec 3 caractères',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3))
    expect(zone.valid).toBeTruthy();
  });
  it('#3 | Zone PRÉNOM valide avec 200 caractères',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200))
    expect(zone.valid).toBeTruthy();
  });
  it('#4 | Zone PRÉNOM invalide avec aucune valeur',() => {
    let zone = component.problemeForm.controls['prenom'];
    expect(zone.valid).toBeFalsy();
  });
  it('#5 | Zone PRÉNOM invalide avec 10 espaces',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10))
    expect(zone.valid).toBeFalsy();
  });
  it('#6 | Zone PRÉNOM invalide avec 2 espaces et 1 caractère',() => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2)+'a'.repeat(1))
    expect(zone.valid).toBeFalsy();
  });
  
  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () =>{
    component.appliquerNotification("");

    let zone = component.problemeForm.get('telephone');
    zone.setValue("");
    
    expect(zone.disabled).toBeTrue();
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () =>{
    component.appliquerNotification("");
    
    let errors = {};
    let zone = component.problemeForm.get('telephone')
    zone.setValue("");
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () =>{
    component.appliquerNotification("");

    let zone = component.problemeForm.get('courrielGroup.courriel');

    expect(zone.disabled).toBeTrue();
  });

  it('#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () =>{
    component.appliquerNotification("");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.disabled).toBeTrue();
  });
  // it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () =>{
  //   component.appliquerNotification("");

  //   let zone = component.problemeForm.get('courrielGroup.courriel');
  //   expect(zone.disabled).toBeTrue();
  // });
  it('#19 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotification('pasnotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });
  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () =>{
    component.appliquerNotification("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.enabled).toBeTrue();
  });
  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () =>{
    component.appliquerNotification("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.enabled).toBeTrue();
  });
  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () =>{
    component.appliquerNotification("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("")
    expect(zone.invalid).toBeTrue();
  });
  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () =>{
    component.appliquerNotification("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue("")
    expect(zone.invalid).toBeTrue();
  });
  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () =>{
    component.appliquerNotification("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("iu239")
    expect(zone.invalid).toBeTrue();
  });
  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () =>{
    
    component.appliquerNotification("");

    let zone = component.problemeForm.get('courrielGroup');
    let zone1 = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone1.setValue("")
    zone2.setValue("123@gmail.com")
    
    expect(zone.invalid).toBeFalsy();
  });
  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () =>{
   
    component.appliquerNotification("");

    let zone = component.problemeForm.get('courrielGroup');
    let zone1 = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone1.setValue("123@gmail.com")
    zone2.setValue("")
    
    expect(zone.invalid).toBeFalsy();
  });
  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () =>{
    component.appliquerNotification("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone1 = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone1.setValue("1235jfh")
    zone2.setValue("8748jnn")


    expect(zone.invalid).toBeTrue();
  });
  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () =>{
    component.appliquerNotification("ParCourriel");

    let zone = component.problemeForm.get('courrielGroup.courriel');
    let zone1 = component.problemeForm.get('courrielGroup.courriel');
    let zone2 = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone1.setValue("123@gmail.com")
    zone2.setValue("123@gmail.com")

    expect(zone.valid).toBeTrue();
  });
   it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () =>{
     component.appliquerNotification("ParTelephone");

     let zone = component.problemeForm.get('telephone');

    

     expect(zone.enabled).toBeTrue();
   });
   it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () =>{
     component.appliquerNotification("ParTelephone");

     let zone = component.problemeForm.get('courrielGroup.courriel');



     expect(zone.disabled).toBeTrue();
   });
   it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () =>{
     component.appliquerNotification("ParTelephone");

     let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');



     expect(zone.disabled).toBeTrue();
   });
   it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () =>{
     component.appliquerNotification("ParTelephone");

     let zone = component.problemeForm.get('telephone');

      zone.setValue("")

     expect(zone.invalid).toBeTrue();
   });
   it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () =>{
     component.appliquerNotification("ParTelephone");

     let zone = component.problemeForm.get('telephone');

    zone.setValue("nieorn")

     expect(zone.invalid).toBeTrue();
   });
   it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () =>{
     component.appliquerNotification("ParTelephone");

     let zone = component.problemeForm.get('telephone');

     zone.setValue("111111111")


     expect(zone.invalid).toBeTrue();
   });
   it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () =>{
     component.appliquerNotification("ParTelephone");

     let zone = component.problemeForm.get('telephone');
      zone.setValue("12345678912")


     expect(zone.invalid).toBeTrue();
   });
   it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () =>{
     component.appliquerNotification("ParTelephone");

     let zone = component.problemeForm.get('telephone');

      zone.setValue("1111111111")

     expect(zone.valid).toBeTrue();
   });
});

