import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManuelDepositService {

  async submitDeposit(formData: FormData, id : string | null): Promise<Response> {
    return await fetch("https://axiaback.onrender.com/api/deposits/manual/"+id, {
      method: 'POST',
      headers : {
        'Authorization' : 'Bearer '+localStorage.getItem('token')
      },
      body: formData
    });
  }

  async getAllDeposit(token : string){
    const rep = await fetch('https://axiaback.onrender.com/api/deposits/manual',{
      method : "GET",
      headers : {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })

    if (!rep.ok){
      throw new Error('Erreur lors de chargement de dépot')
    }

    return await rep.json()
  }

  async updateStatus(id : string, token : string, status : object){
    console.log(status)
    const rep = await fetch(`https://axiaback.onrender.com/api/deposits/manual/${id}`,
      {
        method : "PUT",
        headers : {
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body : JSON.stringify(status)
      }
    )

    if(!rep.ok){
      throw new Error('Erreur lors de la modification de status')
    }

    return await rep.json()

  }

  constructor() { }
}
