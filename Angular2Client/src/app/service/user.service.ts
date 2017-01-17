import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
   private url:string = "http://localhost:8080/RestFulJavaEE/rest/users/auth_user/";
 
   constructor(private http: Http) {
       this.http = http;
   }
   
   public getUser(username, password) {
       return this.http.get(this.url + username + "/" + password)
           .map((res:Response) => res.json());
   }
}