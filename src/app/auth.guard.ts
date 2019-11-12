import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Autenticacao } from "./services/autenticacao.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private route: Router,
        private authServ:Autenticacao){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(this.authServ.autenticado());        
       return this.authServ.autenticado();
    }
}