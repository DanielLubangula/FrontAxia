import { NgIf } from '@angular/common';
import { Login } from './../../models/login';
import { InvestissementService } from './../../services/investissement.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
service : InvestissementService = inject(InvestissementService)
auth : AuthService = inject(AuthService)
messageError! : string
router : Router = inject(Router)
logoUrl! : string 
isLoading : boolean = false

loginForm =  new FormGroup({
email : new FormControl(''),
password : new FormControl('')
})

ngOnInit(){
  this.logoUrl = this.service.getLogoUrl()
}
 
onSubmit() {
  this.isLoading = true
  try {
    this.service.login(
      this.loginForm.value.email ?? '',
      this.loginForm.value.password ?? ''
    ).then((data: Auth | { error: string } | undefined) => {
      this.isLoading = false
      if (!data) {
        this.messageError = 'Une erreur inattendue s\'est produite.';
        return;
      }

      if ('error' in data) {
        // Si 'data' contient une propriété 'error', c'est une erreur
        this.messageError = data.error;
      } else {
        // Sinon, c'est un objet de type Login
        console.log('login réussi', data);
        this.auth.saveToken(data.token, data.name, data.email); // Accès sécurisé à 'token'
        
        this.router.navigate([''])
      }
    });
  } catch (e) {
    console.log('Erreur lors de la connexion', e);
  }
}

}
