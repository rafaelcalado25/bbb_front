import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../../config/api.config';
import { ParticipanteDTO } from '../../../models/participante.dto';
import { VotacaoDTO } from '../../../models/votacao.dto';
import { VotacaoData } from '../data/votacao';
import { ParedaoDTO } from '../../../models/paredao.dto';
import { RegistroVotacoesAgrupadoPorHoraDTO } from '../../../models/registrovotacoesagrupadoporhora.dto';

@Injectable()
export class VotacaoService extends VotacaoData{
  constructor(private http: HttpClient,) {
    super();
  }

  efetuarVotacao(votacao: VotacaoDTO){
    return this.http.post(
      `${ API_CONFIG.baseUrl }/votacao/efetuarvotacao`,
      votacao, 
      {   
        observe:'response',
        responseType: 'json'
      });
  }

  consultarVotacaoParticipante(participante: ParticipanteDTO): Observable<number> {
    return this.http.get<number>(
      `${API_CONFIG.baseUrl}/votacao/consultarvotacaoparticipanteparedao/${participante.id}`
    );
  }

  consultarVotacoesAgrupadasPorHora(paredao: ParedaoDTO): Observable<RegistroVotacoesAgrupadoPorHoraDTO[]> {
    return this.http.get<RegistroVotacoesAgrupadoPorHoraDTO[]>(
      `${API_CONFIG.baseUrl}/votacao/consultarvotacaoagrupadoporhora/${paredao.id}`
    );
  }
}