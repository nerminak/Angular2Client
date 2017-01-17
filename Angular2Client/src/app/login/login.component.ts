import { Component} from '@angular/core';
import { Http} from '@angular/http';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService],
})

export class LoginComponent {
    public error;
    public data: Object = {};
    
    constructor(private http: Http, private userService: UserService, private router:Router) { 
        this.userService = userService;
        this.router = router;
    }
    
    public login() {
        let username = this.data['username'];
        let password = this.data['password'];
        
        this.createCookie(username, password);
        
        this.userService.getUser(username, password)
            .subscribe (
                response => {
                    this.router.navigate(['user']);
                },
                error => this.error = "Username or password is INCORRECT!",
         );
    }
    
    public createCookie(username, password) {
        let key = btoa(btoa(username) + '??' + btoa(password));
        return document.cookie = "sessionID=" + key + ";";
    }
}