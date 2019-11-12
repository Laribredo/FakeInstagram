import * as firebase from 'firebase'
import { Injectable } from '@angular/core';
import { ProgressoService } from './progresso.service';
import { Publicaoes } from "../home/publicacoes/publicacoes.model";
import { reject } from 'q';

@Injectable()
export class BdService{

    constructor(
        private progresso:ProgressoService
    ){}

    public publicar(publicacao:any):void{
        let nomeImagem = Date.now()
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({titulo: publicacao.titulo})
        .then((res) =>{

            let nomeImagem = res.key

            firebase.storage().ref()
            .child(`imagens/${nomeImagem}`)
            .put(publicacao.imagem)
            .on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: any) => {
                    this.progresso.status = 'andamento'
                    this.progresso.estado = snapshot                                  
                },(error:any) => {
                    this.progresso.status = 'erro'
                },() =>{
                    this.progresso.status = 'concluido'      
                })
        })
    }

    public consultaPublicacoes(emailUsuario:string):Promise<any>{
        return new Promise((resolve,reject) =>{
            let publicacoes:Array<Publicaoes> = []

            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
            .orderByKey()
            .once('value')
            .then((snapshot:any) => {            

                snapshot.forEach((childSnapshot:any) => {                
                    firebase.storage().ref().child(`imagens/${childSnapshot.key}`)
                    .getDownloadURL()
                    .then(res =>{
                    let titulo = childSnapshot.val().titulo;
                    let imgUrl = res
                    
                        publicacoes.push(new Publicaoes(titulo, imgUrl))                            
                    })
                                            
                });
                        
            })
            resolve(publicacoes.reverse());
        })
    }
    

    public getUsuario(emailUsuario):Promise<any>{
        return firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
        .once('value')
    }

}