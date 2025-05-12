import { InfoAdmin } from './../../models/info-admin';
import { AdminService } from './../../services/admin.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-info-dashboard',
  imports: [],
  templateUrl: './info-dashboard.component.html',
  styleUrl: './info-dashboard.component.css'
})
export class InfoDashboardComponent {
  serviceAdmin : AdminService = inject(AdminService)
  info : InfoAdmin = {
    totalUsers: 0,  
    totalBalance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0
  }

  ngOnInit() {
    this.serviceAdmin.getAllInfoAdmin().then((data) => {
      if (data.error){
        console.log(data.error)
      }else{
        this.info = data
        console.log(this.info)
      }
    })
  }

}
