import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataService {

	private linkServer = "http://localhost:8080/api"; //local

	private link:string ="";
	 

	private httpOptions = {
    headers: new HttpHeaders({ 'access-control-allow-origin': '*'})

  	};


  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<any> {
      return this.http.post<any>(this.linkServer+'/login', {"username":username, "password": password}, this.httpOptions)
    .pipe();
  }

  getUsers(): Observable<any[]> {
    
    return this.http.get<any[]>(this.linkServer+'/user?auth=true', this.httpOptions)
      .pipe(
      );
  }

  getUserDetails(id:string): Observable<any> {
	   let link:string = this.linkServer+'/user/'+id+'?auth=true';
      return this.http.get<any>(link, this.httpOptions)
      .pipe();
  }

  updateUserDetails(id:string, dados:any): Observable<any> {
    let link:string = this.linkServer+'/user/'+id+'?auth=true';
    return this.http.patch<any>(link, {
     "dtBorn": dados.dtBorn,
     "name": dados.name,
     "password" : dados.password,
     "username": dados.username
      } ,this.httpOptions)
      .pipe();
  }




}
