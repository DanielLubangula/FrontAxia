import { Plan } from './../models/plan';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor() { }

  async getPlans():Promise<Plan>{
      const rep = await fetch('http://localhost:5000/api/plans')
    
      const response = await rep.json()

      return response
  }

  addPlan(vipLevel : string, duration : string, investmentRange : string, weeklyReturn : string): Promise<Plan> {
    
    const plansData = {
      vipLevel,
      duration,
      investmentRange,
      weeklyReturn
    }
    return fetch('http://localhost:5000/api/plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plansData)
    })
      .then(response => {
        if (!response.ok) {
          return {error : 'Erreur lors de la création'};

        }
        return response.json();
      })
      .catch(error => {
        console.error('Erreur réseau ou serveur :', error);
        throw error;
      });
  }

  async deletePlan(id : string){
    return fetch(`http://localhost:5000/api/plans/${id}`, {
      method: 'DELETE'
    }).then(res => res.json());
  }

  updatePlan(id: string, updatedPlan: any) {
    return fetch(`http://localhost:5000/api/plans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPlan)
    }).then(res => res.json());
  }
}
