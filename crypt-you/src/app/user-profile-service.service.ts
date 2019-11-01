import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class UserProfileServiceService {

  constructor(private http:HttpClient) { }
  exportURI(uriString)
  {
    return this.http.post('http://localhost:2000/accessToken',{'uri':uriString},{withCredentials:true})
  }
  verifyUser()
  {
    return this.http.post('http://localhost:2000/userprofile',{'message':'check'},{withCredentials:true})
  }
}
