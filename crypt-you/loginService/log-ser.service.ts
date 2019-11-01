import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LogSerService {

  constructor(private http:HttpClient) { }
  loginTo(username,password)
  {
    return this.http.post("http://localhost:2000/login",{'username':username,'password':password},{withCredentials:true})
  }
}
