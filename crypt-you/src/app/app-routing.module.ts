import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from '../app/registration/registration.component'
import {LoginComponent} from '../app/login/login.component'
import {UserPageComponent} from '../app/user-page/user-page.component'
import {PrivypolicyComponent} from '../app/privypolicy/privypolicy.component'
import {AboutsComponent} from '../app/abouts/abouts.component'
import {LogoutComponent} from '../app/logout/logout.component'
const routes: Routes = [{path:'Registration',component:RegistrationComponent},
{path:'Login',component:LoginComponent},{path:'UserProfile',component:UserPageComponent},
{path:'privypolicy',component:PrivypolicyComponent},{path:'AboutCryptically',component:AboutsComponent},
{path:'logout',component:LogoutComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
