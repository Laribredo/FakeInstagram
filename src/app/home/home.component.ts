import { Component, OnInit, ViewChild } from '@angular/core';
import { Autenticacao } from '../services/autenticacao.service';
import * as firebase from 'firebase'
import { Observable } from 'rxjs';
import { Usuario } from '../acesso/usuario.model';
import { BdService } from "../services/bd.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private authService: Autenticacao,
               private bdService: BdService) { }

  @ViewChild('publicacoes',null) public publicacoes: any   

  public usuario:Usuario

  ngOnInit() {

    console.log(this.usuario == undefined);
    

    firebase.auth().onAuthStateChanged( (res) =>{
      let email = res.email
      this.bdService.getUsuario(email).then( res =>{
        this.usuario = new Usuario(res.val().email,res.val().nome_completo, res.val().nome_usuario, null)
      })

    })
  }

  public atualizarTimeline():void{
    this.publicacoes.atualizarTimeline()    
  }

  public sair():void{
    this.authService.logOut()
  }
}
