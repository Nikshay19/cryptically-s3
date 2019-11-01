import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegSerService {

  constructor(private http:HttpClient) { }
  registerTo(username,email,password)
  {
    return this.http.post("http://localhost:2000/register",{'username': username,'email': email,'password': password},{withCredentials:true})
  }
}
