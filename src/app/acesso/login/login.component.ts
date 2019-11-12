import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Autenticacao } from "../../services/autenticacao.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirCadastro:EventEmitter<string> = new EventEmitter<string>()

  constructor(
    private authService: Autenticacao
  ) { }

  public msgErroLogin:string = ''

  public formulario:FormGroup = new FormGroup({
    'email': new FormControl(null ,[Validators.required, Validators.email]),
    'senha': new FormControl(null,[Validators.required, Validators.minLength(6)])
  })

  ngOnInit() {
    
  }

  public exibirPainelCadastro():void{
     this.exibirCadastro.emit('cadastro')
  }

  public autenticar():void{
    this.authService.autenticar(this.formulario.value.email, this.formulario.value.senha).then()
    .catch(err =>{
      if(err.code === "auth/wrong-password")
      {
        this.msgErroLogin = "A senha inserida é inválida."
      }else 
      if(err.code === "auth/user-not-found")
      {
        this.msgErroLogin = "Usuário Inválido."
      }

    })
  }

}
