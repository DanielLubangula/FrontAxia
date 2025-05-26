import { Deposit } from './../../models/deposit';
import { Component, inject } from '@angular/core';
import { ManuelDepositService } from '../../services/manuel-deposit.service';
import { AuthService } from '../../services/auth.service'
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})

export class DepositComponent {
  service : ManuelDepositService = inject(ManuelDepositService)
  serviceToken : AuthService = inject(AuthService)
  Depots : Deposit[] = []
  searchTerm: string = '';

  get filteredUsers() {
    const term = this.searchTerm.toLowerCase();
    return this.Depots?.filter(Depot =>
      (Depot?.userId?.username ?? '').toLowerCase().includes(term) ||
      (Depot?.userId?.email ?? '').toLowerCase().includes(term)
    ) || [];
  }
  

  ngOnInit(){
    const token = this.serviceToken.getToken()

    if (!token){
      return
    }
    

    this.service.getAllDeposit(token).then((data : any) => {
      this.Depots = data?.all
      console.log('data', this.Depots)
    })
  }

  openImage(url: string) {
  const imageWindow = window.open('', '_blank');
  if (imageWindow) {
    imageWindow.document.write(`
      <html>
        <head><title>Preuve de paiement</title></head>
        <body style="margin:0">
          <img src="${url}" style="width:100%;height:auto;display:block;margin:auto;" />
        </body>
      </html>
    `);
    imageWindow.document.close();
  }
}


  validate(id : string){
    const token = this.serviceToken.getToken()
    const status = {
      status : "validé"
    }

    if (!token){
      return
    }

    this.service.updateStatus(id, token, status).then((data) => {
      console.log('data', data)
    })

    
    this.service.getAllDeposit(token).then((data : any) => {
      this.Depots = data?.all
      console.log('data', this.Depots)
    })
    
  }

  rejeted(id : string){
    const token = this.serviceToken.getToken()
    const status = {
      status : "rejeté"
    }

    if (!token){
      return
    }

    this.service.updateStatus(id, token, status).then((data) => {
      console.log('data', data)
    })

    this.service.getAllDeposit(token).then((data : any) => {
      this.Depots = data?.all
      console.log('data', this.Depots)
    })
  }

  seenUser(){

  }

}
