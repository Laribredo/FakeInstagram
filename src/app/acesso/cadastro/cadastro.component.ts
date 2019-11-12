import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

import { Usuario } from "../usuario.model";
import { Autenticacao } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirLoginE:EventEmitter<string> = new EventEmitter<string>()

  public formulario:FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private servicoAutenticacao:Autenticacao
  ) { }

  ngOnInit() {
  }

  public exibirLogin():void{
    this.exibirLoginE.emit('login')
  }

  /**
   * name
   */
  public cadastrarUsuario():void {    
    let usuario:Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )
      
    this.servicoAutenticacao.cadastrarUsuario(usuario)
    .then(res =>{
      this.exibirLogin()
   }).catch(err =>{
     console.log(err.message);
   })
    

  }

}
