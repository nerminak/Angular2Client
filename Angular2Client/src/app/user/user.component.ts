import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/service/user.service';

@Component({
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [UserService],
})

export class UserComponent implements OnInit {
    private user = [];
    private error;
    
    constructor(public router: Router, private userService: UserService) {
        this.userService = userService;
        this.router = router;
    }
    
    ngOnInit() {
        this.checkUserCredentials();
    }
    
    public checkUserCredentials() {
        var x = document.cookie.split(';');
        var i = 0;
        var cookieValue;
        for(; i < x.length; i++) {
            if(x[i].split('=')[0].trim() == "sessionID") {
                cookieValue = x[i].split('=')[1];
                break;
            }
        }
        if(cookieValue === undefined) {
            this.router.navigate(['login']);
        } else {
            var response = atob(cookieValue).split('??');
            var username = atob(response[0]);
            var password = atob(response[1]); 
            
            this.userService.getUser(username, password)
            .subscribe(
                data => {
                    this.user = data
                },
                err => {
                    this.error = "You are not logged In!";
                    this.router.navigate(['login']);
                },
                () => console.log('done')
             );
        }
    }
    
    public logout() {
        this.deleteCookie("", "");
        this.router.navigate(['login']);
    }
    
    private deleteCookie(username, password) {
        let key = btoa(btoa(username) + '??' + btoa(password));
        return document.cookie = "sessionID=" + key + ";";
    }
    
    public showMenu() {
        var submenu = document.getElementById("submenu");
        if(submenu.style.display == "none") {
            submenu.style.display = "block";
        } else {
            submenu.style.display = "none";
        }
    }
}