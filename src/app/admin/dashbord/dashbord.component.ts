import { Component } from '@angular/core';
import { InfoDashboardComponent } from "../info-dashboard/info-dashboard.component";
import { UsersComponent } from "../users/users.component";
import { DepositComponent } from "../deposit/deposit.component";
import { RetraitComponent } from "../retrait/retrait.component";
import { PlansComponent } from "../plans/plans.component";

@Component({
  selector: 'app-dashbord',
  imports: [InfoDashboardComponent, UsersComponent, DepositComponent, RetraitComponent, PlansComponent],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

}
