import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Imagem } from "./imagem.model";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations:[
    trigger('banner',[
      state('escondido', style({
        opacity:0
      })),
      state('visivel',style({
        opacity:1
      })),
      transition('escondido <=> visivel',animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado:string = 'visivel'

  public imagens:Imagem[] = [
    {estado:'visivel',url:'/assets/img_1.png'},
    {estado:'escondido',url:'/assets/img_2.png'},
    {estado:'escondido',url:'/assets/img_3.png'},
    {estado:'escondido',url:'/assets/img_4.png'},
    {estado:'escondido',url:'/assets/img_5.png'}
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 2000);
  }

  public logicaRotacao():void {    

    let indice:number

    for(let i : number = 0; i <= 4; i++)
    {
      if(this.imagens[i].estado == 'visivel')
      {
        indice = i + 1
        this.imagens[i].estado = 'escondido'
        break
      }
    }

    if(indice >= this.imagens.length )
      indice = 0

    this.imagens[indice].estado = 'visivel'

    setTimeout(() => this.logicaRotacao(), 2000);
  }
}
