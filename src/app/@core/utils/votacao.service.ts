import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../../config/api.config';
import { ParticipanteDTO } from '../../../models/participante.dto';
import { VotacaoDTO } from '../../../models/votacao.dto';

@Injectable()
export class VotacaoService {
  constructor(
    private http: HttpClient,
  ) {}

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
    console.log(participante.id);
    return this.http.get<number>(
      `${API_CONFIG.baseUrl}/votacao/consultarvotacaoparticipanteparedao/${participante.id}`
    );
  }
}