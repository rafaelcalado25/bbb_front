import { Component, OnInit } from '@angular/core';
import { ParticipanteDTO } from '../../../models/participante.dto';
import { ParedaoDTO } from '../../../models/paredao.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VotacaoDTO } from '../../../models/votacao.dto';
import { ParedaoData } from '../../@core/data/paredao';
import { ParticipanteData } from '../../@core/data/participante';
import { VotacaoData } from '../../@core/data/votacao';
import { StorageService } from '../../@core/data/storage.service';
import { UsuarioDTO } from '../../../models/usuario.dto';
import { Router } from '@angular/router';
import { RegistroVotacoesAgrupadoPorHoraDTO } from '../../../models/registrovotacoesagrupadoporhora.dto';
import { UsuarioData } from '../../@core/data/usuario';


@Component({
  selector: 'ngx-votacao',
  templateUrl: './votacao.component.html',
  styleUrls: ['./votacao.component.scss']
})
export class VotacaoComponent implements OnInit {

  user: any;
  userPictureOnly: true;
  participantes: ParticipanteDTO [] = [];
  paredaoAtivo: ParedaoDTO;
  proximoParedao: ParedaoDTO;
  todosParticipantes:  ParticipanteDTO [] = [];
  
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  FIRST_STEP = 1;
  SECOND_STEP = 2;
  THIRD_STEP = 3;

  processandoCard = true;
  liberarPrimeiroPasso = false;
  houveErro = false;
  textoErro: string;

  date = new Date();
  mapParticipanteVotacao: Map<ParticipanteDTO,number>;
  usuarioLogado: UsuarioDTO;
  isAudiencia = false;
  totalVotacao: RegistroVotacoesAgrupadoPorHoraDTO[];
  constructor( private participanteService: ParticipanteData, 
    private paredaoService: ParedaoData, private votacaoService: VotacaoData,
    private fb: FormBuilder, private storage: StorageService,
    private router: Router, private usuarioService: UsuarioData) {
    this.mapParticipanteVotacao = new Map (); 
    this.usuarioService.getUsuarioLogado().subscribe(
      response => {
        this.usuarioLogado = response;
        if(this.usuarioLogado){
          if(this.usuarioLogado.perfis.nome == 'ROLE_AUDIENCIA'){
            this.isAudiencia = true;
          } else {
            this.isAudiencia = false;
          }
          console.log(this.usuarioLogado);
        }else{
          this.storage.setUsuarioLogado(null);
          this.router.navigate(['auth/login']);
        }
        
      }
    ); 
      
    this.paredaoService.getParedaoAtivo().subscribe(
      response => {
        this.paredaoAtivo = response;
        
        if(this.paredaoAtivo){
          this.participantes = this.paredaoAtivo.participantes;
          this.processandoCard = false;
          this.participantes.map( p => {
            this.votacaoService.consultarVotacaoParticipante(p).subscribe(
              response =>{
                this.mapParticipanteVotacao.set(p,response);
                
              }
            );
          });
        }
        
      }
    );
     this.participanteService.getAllParticipantes().subscribe(
      response => {
        this.todosParticipantes = response;
      }
    ); 

    this.paredaoService.getProximoParedao().subscribe(
      response => {
        this.proximoParedao = response;
        this.processandoCard = false;
      }
    );
    //if(this.paredaoAtivo){
      
     //}
    }
    

   

  ngOnInit(): void {    

    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: [null],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', ],
    });
  }

  votar(id: number){
    if(this.paredaoAtivo && !this.proximoParedao){
      var votacao: VotacaoDTO;
    var indice = 0;
    var p = this.participantes.filter((x,i) => {
      if(x.id == id){
        indice = i;
        return x;
      }
    });
    votacao = {participante: p[0]};
    this.votacaoService.efetuarVotacao(votacao).subscribe(
      () => {
        this.participantes.map( p => {
          this.votacaoService.consultarVotacaoParticipante(p).subscribe(
            response =>{
              this.mapParticipanteVotacao.set(p,response);
            }
          );
        });
      },
      erro => {
        this.textoErro = '';
        if(erro.status == 412){
          console.log(erro.error.message);
          this.textoErro = erro.error.message;
        } else if(erro.status == 403){
          console.log(erro.error.message);
          this.textoErro = 'Acesso negado! Apenas usuários com perfil de audiência podem votar.';
        }
        this.houveErro = true;
        console.log(erro);
      }
    );
    }    
  }

  onClose(){
    this.houveErro = false;
  }
  eliminar(id: number){
    var indice = 0;
    var p = this.participantes.filter((x,i) => {
      if(x.id == id){
        indice = i;
        return x;
      }
    });
    this.todosParticipantes.push(p[0]);
    this.participantes.splice(indice,1);

    if(this.participantes && this.participantes.length > 1){
      this.liberarPrimeiroPasso = true;
    }else {
      this.liberarPrimeiroPasso = false;
    }
  }

  colocarParticipanteParedao(evento: any){
    var indice = 0;
    var p = this.todosParticipantes.filter((x,i) => {
      if(x.id == evento){
        indice = i;
        return x;
      }
    });
    this.participantes.push(p[0]);
    this.todosParticipantes.splice(indice,1);
    
    if(this.participantes && this.participantes.length > 1){
      this.liberarPrimeiroPasso = true;
    }else {
      this.liberarPrimeiroPasso = false;
    }
    
  }

  onNextStep(step: number){
    if(step == this.FIRST_STEP){
      if(this.participantes && this.participantes.length > 1){
        this.firstForm.markAsDirty();
      } else {
        this.firstForm.markAsPristine();
        console.log('Colocar alerta de erro');
      }      
    } else if(step == this.SECOND_STEP){
      this.secondForm.markAsDirty();
    } else if(step == this.THIRD_STEP){
      this.thirdForm.markAsDirty();
    } 
  }

  confirmarParedao(){
    var paredao : ParedaoDTO = {
      fechado: true,
      participantes: this.participantes,
      realizacao: this.date
    }
    this.paredaoService.formarParedao(paredao).subscribe(
      response => {
        console.log(response);
        if(response && response.body){
          this.proximoParedao = response.body as ParedaoDTO ;
          console.log(this.proximoParedao);
        }
      }
    );
  }

  fecharParedao(){
    
    this.paredaoService.fecharParedao(this.paredaoAtivo).subscribe(
      response => {
        console.log(response);
        if(response && response.body){
          this.proximoParedao = response.body as ParedaoDTO ;
          console.log(this.proximoParedao);
        }
      }
    );
  }

  liberarParedao(){
    this.mapParticipanteVotacao = new Map(); 
    console.log(this.proximoParedao);
    this.paredaoService.liberarParedao(this.proximoParedao).subscribe(
      response => {
        console.log(response);
        this.paredaoAtivo = response.body as ParedaoDTO;

        this.paredaoService.getParedaoAtivo().subscribe(
          response => {
            this.paredaoAtivo = response;
            if(this.paredaoAtivo){
              this.participantes = this.paredaoAtivo.participantes;
              this.participantes.map( p => {
                this.votacaoService.consultarVotacaoParticipante(p).subscribe(
                  response =>{
                    this.mapParticipanteVotacao.set(p,response);
                  }
                );
              });
            }
            
          }
        );
      }
    );
  }

}
