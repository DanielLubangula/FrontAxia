
import { NgFor } from '@angular/common';
import { PlanService } from '../../services/plan.service';
import { PlanCardComponent } from '../plan-card/plan-card.component';
import { Plan } from './../../models/plan';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-plan',
  imports: [PlanCardComponent, NgFor],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {

  service : PlanService = inject(PlanService)
  plans : Plan[] = []
  isLoad : boolean = false

  ngOnInit(){
    this.service.getPlans().then((data : any) => {
      this.isLoad = true
      this.plans = data 
      // console.log('data',data)
    })
  }

}
