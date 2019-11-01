import { Component, OnInit } from '@angular/core';
import {LogSerService} from '../../app/../../loginService/log-ser.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LogSerService,private router:Router) { }

  ngOnInit() {
  }
  login(username,password)
  {
    this.loginService.loginTo(username,password).subscribe((response)=>{
      if(response[0].redir==='userprofile')
      {
        alert('You have not logged out!')
        this.router.navigate(['UserProfile'],{queryParams:{'user':response[0].user}})
      }
      else if(response[0].mess==='userfound')
      {
        this.router.navigate(['UserProfile'],{queryParams:{'user':response[0].user}})
      }
      else
      {
        console.log('Something else is screwed up')
      }
    }),(error)=>{
      console.log(JSON.stringify(error))
    }
  }

}
