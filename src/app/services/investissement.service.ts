import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Register } from '../models/register';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class InvestissementService {

  
  constructor() { }

  getLogoUrl() {
   return "http://localhost:5000/static/images/logo.png"
  }
  
  async login(email : string, password : string):Promise<Auth | {error : string} | undefined>{
   
    const datas = {
      email : email,
      password : password
    }

    const envoie = await fetch(`http://localhost:5000/api/auth/login`,
      {
        method : 'POST',
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(datas)
      }
    )

    const response = await envoie.json()

    if (!envoie.ok) { // Vérifie si le statut HTTP n'est pas 200 ou 201
      return { error : response.message, }
    }

    return response
  }

  async register(email : string, password : string, referredBy : string, username : string):Promise<Auth | {error : string} | undefined>{

    const credentiels = {
      email : email, password : password, referredBy : referredBy, username : username
    }

    const envoie = await fetch('http://localhost:5000/api/auth/register',{
      method : 'POST',
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(credentiels)
    })

    const rep = await envoie.json()

    if (!envoie.ok){
       console.log('Une erreur est survenue', rep.message)
       return {error : rep.message}
    }

    return rep
  }

  

}
