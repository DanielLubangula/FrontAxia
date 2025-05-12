import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  async loginAdmin(email : string, password : string){

    const credentiels = {
      email , password
    }

    const response = await fetch('http://localhost:5000/api/admin/login', {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(credentiels)
    })

    if (!response.ok){
      return {error : "Identifiants incorrects"}
    }

    return await response.json()

  }

  async getAllInfoAdmin(){
    const rep = await fetch('http://localhost:5000/api/admin/dashboard-stats', {
      method : "GET",
      headers : {
        "authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (!rep.ok){
      return {error : "Erreur lors de la récupération des données"}
    }
    return await rep.json()
  }

  async infoUser (id : string){
    const rep = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
      method : 'GET',
      headers : {
         "authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })

    return await rep.json()
  }

  constructor() { }
}
