import { AboutComponent } from './module/about/about.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './module/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ManuelDepositComponent } from './module/manuel-deposit/manuel-deposit.component';
import { ProfileComponent } from './module/profile/profile.component';
import { ParameterComponent } from './module/parameter/parameter.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { AddPlanComponent } from './admin/add-plan/add-plan.component';
import { DetailInfoUserComponent } from './module/detail-info-user/detail-info-user.component';
import { UpdateAmountComponent } from './admin/update-amount/update-amount.component';
import { RetraitComponent } from './admin/retrait/retrait.component';
import { RequestRetraitComponent } from './module/request-retrait/request-retrait.component';
import { FaqComponent } from './module/faq/faq.component';

export const routes: Routes = [
    {path : 'home', component : HomeComponent},
    {path : '', component : HomeComponent},
    {path : 'auth/login', component : LoginComponent},
    {path : 'auth/register', component : RegisterComponent},
    {path : 'deposit/:id', component : ManuelDepositComponent},
    {path : 'profil', component : ProfileComponent},
    {path : 'setting', component : ParameterComponent},
    {path : 'secret/admin/login', component : LoginAdminComponent},
    {path : 'secret/admin/dashbord', component : DashbordComponent},
    {path : 'secret/admin/add/plan', component : AddPlanComponent},
    {path : 'secret/admin/detail/info/:id', component : DetailInfoUserComponent},
    {path : 'secret/admin/user/details/:id', component : UpdateAmountComponent},
    {path : 'retrait', component : RequestRetraitComponent},
    {path : 'about', component :  AboutComponent},
    {path : 'faq', component :  FaqComponent}
];
 