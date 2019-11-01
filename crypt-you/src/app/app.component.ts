import { Component } from '@angular/core';
import {LogoutComponent} from '../app/logout/logout.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private LogOut:LogoutComponent){}
  triggerLogOut()
  {
    this.LogOut.Logout()
  }
  title = 'crypt-you';
}
