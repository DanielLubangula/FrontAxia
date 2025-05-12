import { InvestissementService } from './../services/investissement.service';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from 'express';
import { AuthService } from '../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
}) 
export class HeaderComponent {
  logoUrl! : string
  service : InvestissementService = inject(InvestissementService)
  auth : AuthService = inject(AuthService)
  isLogin !: boolean
  userName !: string | null
  isOpen : boolean = true
  // router : Router = inject(Router)

  constructor(){

    this.logoUrl = this.service.getLogoUrl()
    this.isLogin = this.auth.isLoggedIn()
    this.userName = localStorage.getItem("name")
  }

  ngOnInit(){
   // console.log("isLogin",this.isLogin)
  }

  toggleMenu(){
    this.isOpen = !this.isOpen
    console.log('isOpen', this.isOpen)
  }

  logout(){
    this.auth.clearToken()
  }

}
