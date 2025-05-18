import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  async loginAdmin(email : string, password : string){

    const credentiels = {
      email , password
    }

    const response = await fetch('https://axiaback.onrender.com/api/admin/login', {
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
    const rep = await fetch('https://axiaback.onrender.com/api/admin/dashboard-stats', {
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
    const rep = await fetch(`https://axiaback.onrender.com/api/admin/users/${id}`, {
      method : 'GET',
      headers : {
         "authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })

    return await rep.json()
  }

  async deleteUser(id : string){
    const rep = await fetch(`https://axiaback.onrender.com/api/admin/user/${id}`, {
      method : 'DELETE',
      headers : {
        "authorization" : `Bearer ${localStorage.getItem('token')}`
        
      }
    }).then((res) => {
      if (!res.ok){
        return {error : "Erreur lors de la suppression de l'utilisateur"}
      }
      return res.json()
    }).catch((err) => {
      return {error : "Erreur lors de la suppression de l'utilisateur"}
    } )

}
}
