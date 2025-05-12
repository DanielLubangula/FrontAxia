import { NgFor, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { InfoUserService } from './../../services/info-user.service';
import { Component, inject } from '@angular/core';
import { InfoUser } from '../../models/info-user';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [NgFor, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  service : InfoUserService = inject(InfoUserService)
  tokenService : AuthService = inject(AuthService)
  adminService : AdminService = inject(AdminService)
  users : InfoUser[] = []
  router : ActivatedRoute = inject(ActivatedRoute)
  route : Router = inject(Router)

  ngOnInit(){
    const token = this.tokenService.getToken()
    if (!token){
      return
    }
    this.service.getAlluser(token).then((data) => {
      this.users = data
    })
  }

  seenUser(id : string){
   
    this.route.navigate([`secret/admin/detail/info/${id}`])
    
    
  }
}
