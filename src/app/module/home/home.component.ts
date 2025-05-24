import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Plan } from '../../models/plan';
import { PlanCardComponent } from '../plan-card/plan-card.component';
import { PlanComponent } from '../plan/plan.component';
import { FooterComponent } from "../footer/footer.component";


@Component({
  selector: 'app-list',
  imports: [PlanComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  plans : any

  constructor() { }

  message() {
    console.log("message : ")
  }

  ngOnInit(){
    // this.service.getPlans().then((data : Plan | undefined) => {
    //   this.plans = data ?? []; 
    //   // console.log("this : ",this.plans)
    // })
  }

  openWhatsApp() {
    const phoneNumber = '62 813-7395-1543'; // Remplace par le numéro du service client (au format international sans +)
    const message = encodeURIComponent('Bonjour, j’ai besoin d’aide concernant votre plateforme.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }

  openTelegram() {
  const telegramUsername = 'Axiacapi'; // Remplace par ton @nom d'utilisateur sans le @
  const telegramUrl = `https://t.me/${telegramUsername}`;
  window.open(telegramUrl, '_blank');
}
  
  
}
