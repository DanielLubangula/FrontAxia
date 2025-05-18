import { NotificationService } from './../../services/notification.service';
import { Component, inject } from '@angular/core';
import { InfoUserService } from '../../services/info-user.service';
import { AuthService } from '../../services/auth.service';
import { InfoUser } from '../../models/info-user';
import { Deposit } from '../../models/deposit';
import { CommonModule, NgFor } from '@angular/common';
import { Plan } from '../../models/plan';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [ NgFor, CommonModule, RouterLink ],
})
export class ProfileComponent {

  service : InfoUserService = inject(InfoUserService);
  serviceNotif : NotificationService = inject(NotificationService);
  servicetoken : AuthService = inject(AuthService);

  balance!: any;
  name!: string;
  email!: string;
  date!: string;
  referralLink!: string;
  plan !: Plan

  // Liste des dépôts à afficher
  depots: Deposit[] = [];
  retraits: any[] = [];
  retraitsOrder: any[] = [];


  ngOnInit() {
    const token = this.servicetoken.getToken();
    if (!token) return;

    this.service.getUserInfo(token).then((data: InfoUser) => {
      this.balance = data.balance;
      this.email = data.email;
      this.date = data.createdAt;
      this.name = data.name;
      this.referralLink = data.referralLink;
    });

    this.serviceNotif.getAllNotif(token).then((res: any) => {
      
      // filtrer uniquement les dépôts validés ou rejetés
      this.depots = res.depots.filter((d: Deposit) =>
        d.status === 'validé' || d.status === 'rejeté'
    );

      this.retraits = res.retraits.filter((d: Deposit) =>
        d.status === 'approved' || d.status === 'rejected'
    );

    this.retraitsOrder = res.retraits.sort(
      (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    


    console.log("retraits", this.retraits )
    console.log("res", res)

    });
  }
}
