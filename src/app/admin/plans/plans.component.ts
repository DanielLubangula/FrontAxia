import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Plan } from '../../models/plan';
import { PlanService } from './../../services/plan.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, RouterLink, NgIf],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css'
})
export class PlansComponent implements OnInit {
  service: PlanService = inject(PlanService);
  newPlanForm: FormGroup = new FormGroup({});
  plans: Plan[] = [];
  forms: { [id: string]: FormGroup } = {};
  isLoading : boolean = false

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.service.getPlans().then((data: any) => {
      this.plans = data;
      this.buildForms();
    });
  }

  buildForms() {
    this.plans.forEach(plan => {
      this.forms[plan._id] = this.fb.group({
        vipLevel: new FormControl(plan.vipLevel),
        investmentRange: new FormControl(plan.investmentRange),
        duration: new FormControl(plan.duration),
        weeklyReturn: new FormControl(plan.weeklyReturn),
      });
    });
  }
  
  modified(id: string) {
    this.isLoading = true
    const form = this.forms[id];
    if (form.valid) {
      const updatedPlan = form.value;
      
      console.log('Updated Plan:', updatedPlan);
      console.log('Plan ID:', id);
      this.service.updatePlan(id, updatedPlan).then(() => {
        this.isLoading = false
        alert('Plan mis à jour avec succès');
      });
    }
  }
  
  deletePlan(id: string) {
    this.isLoading = true
    if (confirm('Confirmer la suppression ?')) {
      this.service.deletePlan(id).then(() => {
        this.plans = this.plans.filter(p => p._id !== id);
        delete this.forms[id];
        this.isLoading = false
      });
    }
  }
  
  addPlan(){

  }
}
