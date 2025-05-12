import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { InvestissementService } from '../../services/investissement.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-admin',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  logo: string = ""
  service: AdminService = inject(AdminService)
  logoService: InvestissementService = inject(InvestissementService)
  serviceToken: AuthService = inject(AuthService)
  router : Router = inject(Router)
  b : boolean = false
  messageError : string = ""
  formLoginAdmin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  ngOnInit() {
    this.logo = this.logoService.getLogoUrl()
  }

  AdminLogin() {
    this.service.loginAdmin(
      this.formLoginAdmin.value.email ?? "",
      this.formLoginAdmin.value.password ?? ""
    ).then(((data) => {
      if (data?.error){
        this.messageError = data.error
        this.b = true
        return
      }
      this.b = false
      this.serviceToken.saveToken(data.token)
      this.router.navigate(['secret/admin/dashbord'])
    })).catch((e) => { 
      console.log('Error')
    })
  }

}
