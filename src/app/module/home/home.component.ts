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
  
}
