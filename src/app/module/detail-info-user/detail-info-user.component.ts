import { Component, inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-info-user',
  imports: [CommonModule, RouterLink],
  templateUrl: './detail-info-user.component.html',
  styleUrl: './detail-info-user.component.css'
})
export class DetailInfoUserComponent {
  user: any;
  depots: any[] = [];
  retraits: any[] = [];


  serviceInfo: AdminService = inject(AdminService);
  route: ActivatedRoute = inject(ActivatedRoute);
 
  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id'); // Retrieve 'id' from the URL
    if (userId) {
      this.serviceInfo.infoUser(userId).then((data) => {
      
        this.user = data.user;
        this.depots = data.depots;
        this.retraits = data.retraits;

        console.log(data)
      });
    }
  }
}
