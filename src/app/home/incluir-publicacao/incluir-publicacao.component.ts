import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { BdService } from "../../services/bd.service";

import * as firebase from 'firebase'
import { ProgressoService } from 'src/app/services/progresso.service';
import { Subject,interval } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { Usuario } from 'src/app/acesso/usuario.model';


@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario = new FormGroup({
    'titulo': new FormControl(null)
  })

  @Output() public atualizarTimeline:EventEmitter<any> = new EventEmitter()

  @Input() public usuario:Usuario
  private image:any

  public progressoPublicacao: string = 'pendente'
  public porcentagem: number 

  constructor(
    private bd: BdService,
    private progresso:ProgressoService
  ) { }

  ngOnInit() {
  }

  public publicar():void{;
    
    this.bd.publicar({
      email: this.usuario.email,
      titulo: this.formulario.value.titulo,
      imagem: this.image[0]
    })

    let acompanhamentoUpdate = interval(150)
    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpdate
    .pipe(
      takeUntil(continua)
    )
    .subscribe(() =>{
      this.progressoPublicacao = 'andamento'

      if( this.progresso.estado !== undefined)
      {
        this.porcentagem = Math.round( ( this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes ) * 100) 
      }

      if(this.progresso.status === 'concluido' ){
        this.progressoPublicacao = 'concluido'
        continua.next(false)

        this.atualizarTimeline.emit()
      }
    })
  }

  preparaImagemUpload(event:Event):void{
    this.image = (<HTMLInputElement>event.target).files
  }

}
