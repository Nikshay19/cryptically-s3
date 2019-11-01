import { Component, OnInit } from '@angular/core';
import {RegSerService} from '../../app/../../registrationService/reg-ser.service'
import { OAuthSignupService} from '../o-auth-signup.service'
import {Router} from '@angular/router'
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  url:string
  eventObj:any
  constructor(private registration:RegSerService,private oauthService:OAuthSignupService,private router: Router) { 
  }

  ngOnInit() {
  }
  register(username,email,password)
  {

    this.registration.registerTo(username, email, password).subscribe((response)=>{
      if(response[0].redir==='userprofile')
      {
        alert('You are already logged in!!!')
        this.router.navigate(['UserProfile'],{queryParams:{user:JSON.stringify(response[0].user)}})
      }
      else if(response[0].mess==='InsertionSuccess')
      {
        alert('Welcome to cryptically')
        this.router.navigate(['UserProfile'],{queryParams:{user:JSON.stringify(response[0].user)}})
      }
    }),
    (error)=>{
      console.log(JSON.stringify(error))
    }
  }
  OauthSignup(scope_credObj){
    this.oauthService.OauthNode(scope_credObj).subscribe((result)=>{
      console.log('Success')
      this.urlResultAccess(result)
    }),(error)=>{
      console.log('Error angular' + error)
    }
  }
urlResultAccess(urlObj){
const url=urlObj.href
window.open(url)
}
}
