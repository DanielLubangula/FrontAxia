import { Auth } from './../../models/auth';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InvestissementService } from '../../services/investissement.service';
import { Register } from '../../models/register';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  service : InvestissementService = inject(InvestissementService)
  auth : AuthService = inject(AuthService)
  messageError : string = ""
  b : boolean = false
  isLoading : boolean = false
  logoUrl! : string
  router : Router = inject(Router)
  
  registerForm = new FormGroup({
    username : new FormControl(''),
    email : new FormControl(""), 
    password : new FormControl(''),
    referredBy : new FormControl('')
  })

  ngOnInit(){
    this.logoUrl = this.service.getLogoUrl()
  }
 
  save() {
    this.isLoading = true
    try {
      this.service.register(
        this.registerForm.value.email ?? "",
        this.registerForm.value.password ?? "",
        this.registerForm.value.referredBy ?? "",
        this.registerForm.value.username ?? ""
      ).then((data: Auth | { error: string } | undefined) => {
        this.isLoading = false
        if (!data) {
          console.log('Une erreur inattendue s\'est produite.');
          this.messageError = 'Une erreur inattendue s\'est produite.';
          this.b = true;
          return;
        }
  
        if ('error' in data) {
          // Si 'data' contient une propriété 'error', c'est une erreur
          console.log('Erreur lors de l\'inscription', data);
          this.b = true;
          this.messageError = data.error;
        } else {
          // Sinon, c'est un objet de type Auth
          console.log('Inscription réussie', data);
          this.auth.saveToken(data.token, data.name, data.email); // Accès sécurisé à 'token'
          this.b = false;
          this.router.navigate([''])

        }
      });
    } catch (e) {
      console.log('Erreur lors de l\'inscription', e);
    }
  }
 
}
