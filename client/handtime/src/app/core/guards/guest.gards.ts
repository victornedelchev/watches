import { Injectable } from "@angular/core";
import { UserService } from "../user.service";
import { CanActivate, Router, UrlTree } from "@angular/router";

@Injectable({
    providedIn: 'root',
})
export class GuestGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    canActivate(): boolean | UrlTree {
        if (!this.userService.isLoggedIn()) {
            return true;
        }
        return this.router.createUrlTree(['/']);
    }
}