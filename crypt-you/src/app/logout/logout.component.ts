import { Component, OnInit } from '@angular/core';
import {LogoutServService} from '../logout-serv.service'
import {Router,ActivatedRoute} from '@angular/router'
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logout:LogoutServService,private router:Router,private cookieService: CookieService) { }

  ngOnInit() {
  }
Logout()
{
  this.logout.logout().subscribe((response)=>{
    console.log(JSON.stringify(response) + 'here')
    if(response[0].action==='logout')
    {
      this.cookieService.delete('cookie')
      this.router.navigate(['/'])
    }
    else if(response[0].status==='already')
    {
      alert('You have already logged out')
    }
    else
    {
      console.log('Something else is screwed up')
    }
  },(error)=>{
    console.log("Error oooh "+ JSON.stringify(error))
  })
}
}
