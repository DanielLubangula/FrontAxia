import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Plan } from '../../models/plan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-card',
  imports: [NgIf, NgClass, NgStyle],
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.css'
})

export class PlanCardComponent {
  @Input() plan !: Plan
  router : Router = inject(Router)

  getVipCardClass(vipLevel: string): string {
    switch (vipLevel) {
      case 'VIP-0': return 'bg-gradient-primary';
      case 'VIP-1': return 'bg-gradient-success';
      case 'VIP-2': return 'bg-gradient-info';
      case 'VIP-3': return 'bg-gradient-warning';
      case 'VIP-4': return 'bg-gradient-danger';
      case 'VIP-5': return 'bg-gradient-secondary';
      default: return 'bg-gradient-light';
    }
  }

  getVipIconColor(vipLevel: string): string {
    switch (vipLevel) {
      case 'VIP-0': return '#007bff';
      case 'VIP-1': return '#28a745';
      case 'VIP-2': return '#17a2b8';
      case 'VIP-3': return '#ffc107';
      case 'VIP-4': return '#dc3545';
      case 'VIP-5': return '#6c757d';
      default: return '#333';
    }
  }

  getVipBackground(vipLevel : string) : string {
    switch (vipLevel) {
      case 'VIP-0': return 'vip-0';
      case 'VIP-1': return 'vip-1';
      case 'VIP-2': return 'vip-2';
      case 'VIP-3': return 'vip-3';
      case 'VIP-4': return 'vip-4';
      case 'VIP-5': return 'vip-5';
      default: return '#333';
    }
  }
  ngOnInit(){
    // console.log('plan', this.plan)
  }

  handleClick(id : string) {
    this.router.navigate([`deposit/${id}`])

  }
}
