import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  async getAllNotif(token : string){
    console.log('Bien bien')
    const rep = await fetch('https://axiaback.onrender.com/notification/info', {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    return await rep.json()
  }

  constructor() { }
}
