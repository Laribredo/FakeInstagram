import { Component, OnInit, Input } from '@angular/core';
import { BdService } from "../../services/bd.service";
import { Usuario } from 'src/app/acesso/usuario.model';
import { Publicaoes } from "./publicacoes.model";

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  @Input() public usuario:Usuario
  public publicacoes:Publicaoes 

  constructor(
    private service: BdService
  ) { }

  ngOnInit() {    
    this.atualizarTimeline();
  }


  public atualizarTimeline():void{
    this.service.consultaPublicacoes(this.usuario.email).then((res:Publicaoes) =>{
      this.publicacoes = res
    })
  }

}
