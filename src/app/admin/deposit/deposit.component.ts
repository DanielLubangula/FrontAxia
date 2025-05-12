import { Deposit } from './../../models/deposit';
import { Component, inject } from '@angular/core';
import { ManuelDepositService } from '../../services/manuel-deposit.service';
import { AuthService } from '../../services/auth.service'
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-deposit',
  imports: [NgFor, CommonModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})

export class DepositComponent {
  service : ManuelDepositService = inject(ManuelDepositService)
  serviceToken : AuthService = inject(AuthService)
  Depots !: Deposit[]

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
