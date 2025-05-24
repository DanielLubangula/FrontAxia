import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgIf ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showHeader = true

  ngOnInit(){
  }

  constructor(private router: Router) {
    this.router.events.subscribe(() => {

      const hiddenRoutes = ["auth/login", "auth/register", "secret/admin/login", "secret/admin/dashbord", "add/plan", "admin/detail/info/", "/secret/admin/user/details"]

      this.showHeader = !hiddenRoutes.includes(this.router.url)
      this.showHeader = !hiddenRoutes.some(route => this.router.url.includes(route));

    })
  }
  title = 'Axia-Capital';
} 
