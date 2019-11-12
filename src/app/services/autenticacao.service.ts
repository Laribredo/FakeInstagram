import { Usuario } from "../acesso/usuario.model";
import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


 @Injectable()
 export class Autenticacao{

    constructor(
        private router:Router
    ){}

    public id_token:string = null

    public cadastrarUsuario(usuario:Usuario):Promise<any>{
        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then(res =>{
            delete usuario.senha

            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set( usuario ).then(res =>{
            }).catch(err =>{
                console.log('Não foi possível inserir o usuário no banco ');              
                console.log(err);        
            })

        }).catch(err =>{
            console.log(err);
            
        })
    }

    public autenticar(email:string, senha:string):Promise<any>{
        return firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(res =>{
            firebase.auth().currentUser.getIdToken().then(res =>{
                this.id_token = res
                localStorage.setItem('idToken', this.id_token)
                this.router.navigate(['/home'])
            })         
        })
    }

    public autenticado():boolean{       
        let isAuth:boolean = localStorage.getItem('idToken') == null || localStorage.getItem('idToken') === undefined ? false : true    

        if(!isAuth)
            this.router.navigate(['/'])

        return  isAuth
    }

    public logOut():boolean{

        let logout:boolean = false;

        firebase.auth().signOut().then(res =>{
            localStorage.removeItem('idToken')
            logout = true
        }).then( err =>{
            logout = false
        })

        return logout
    }
 }