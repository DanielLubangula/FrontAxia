import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { PlanService } from '../../services/plan.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-plan',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.css'
})
export class AddPlanComponent { 
  service : PlanService = inject(PlanService)
  msgError : String = ""
  msgSuccess : String = ""
  b : boolean = false
  isLoading : boolean = false

  planForm : FormGroup = new FormGroup({
    vipLevel: new FormControl(''),
    investmentRange: new FormControl(''),
    duration: new FormControl(''),
    weeklyReturn:new FormControl('')
  })

  onSubmit(){ 
    this.isLoading = true
    this.b = true
    this.service.addPlan(
      this.planForm.value.vipLevel ?? "",
      this.planForm.value.duration ?? "",
      this.planForm.value.investmentRange ?? "",
      this.planForm.value.weeklyReturn ?? "",
    ).then((data : any) => {
      this.isLoading = false
      if (data?.error){
        this.msgError = data.error;  
      }

      this.planForm  = new FormGroup({
        vipLevel: new FormControl(''),
        investmentRange: new FormControl(''),
        duration: new FormControl(''),
        weeklyReturn:new FormControl('')
      })
      this.msgSuccess = "Plan ajouté avec succès"


      setTimeout(() => {
        this.msgSuccess = "" 
      }

      , 4000)
    })
  }

}
