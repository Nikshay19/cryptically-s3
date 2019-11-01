import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OAuthSignupService {

  constructor(private http:HttpClient) { 
  }
  OauthNode(SCOPE_CREDOBJ){
    return this.http.post("http://localhost:2000/oAuthSignup",SCOPE_CREDOBJ,{withCredentials:true})

  }
}
