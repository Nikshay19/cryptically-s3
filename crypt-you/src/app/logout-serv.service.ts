import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class LogoutServService {

  constructor(private http:HttpClient) { }
  logout()
  {
    return this.http.post("http://localhost:2000/logout",{'logout':'logout'},{withCredentials:true})
  }
}
