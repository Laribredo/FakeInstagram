import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { routes } from "./app-routing.module";
import { Autenticacao } from "../app/services/autenticacao.service";
import { AuthGuard } from "./auth.guard";
import { BdService } from "./services/bd.service";
import { ProgressoService } from "./services/progresso.service";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ Autenticacao, AuthGuard, BdService, ProgressoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
