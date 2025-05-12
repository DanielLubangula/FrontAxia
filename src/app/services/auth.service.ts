import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  TOKEN_KEY = "token"
  TOKEN_NAME = "name"
  TOKEN_EMAIL = "email"

  constructor() { }

  // Enregister le token
  saveToken(token : string, name : string = "Admin", email :string = "") : void {

    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.TOKEN_NAME, name)
    localStorage.setItem(this.TOKEN_EMAIL, email)
  }

  // Récupérer le token
  getToken() : string | null {
    
    return localStorage.getItem(this.TOKEN_KEY)
  }
  
  // Supprimé le token
  clearToken() : void {
    
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.TOKEN_NAME)
    localStorage.removeItem(this.TOKEN_EMAIL)
    window.location.reload()
  }
  
  // Vérifier si l'utilisateur est connecté
  isLoggedIn() : boolean {
    // console.log("getToken", localStorage.getItem(this.TOKEN_KEY))
    return !!this.getToken()
  }
}
