import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../../config/api.config';
import { ParticipanteDTO } from '../../../models/participante.dto';
import { ParedaoDTO } from '../../../models/paredao.dto';

@Injectable()
export class ParedaoService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllParedoes(): Observable<ParedaoDTO[]> {
    return this.http.get<ParedaoDTO[]>(
      `${API_CONFIG.baseUrl}/paredao/paredoes`
    );
  }

  getParedaoAtivo(): Observable<ParedaoDTO> {
    return this.http.get<ParedaoDTO>(
      `${API_CONFIG.baseUrl}/paredao/paredao/ativo`
    );
  }

  formarParedao(paredao: ParedaoDTO){
    return this.http.post(
      `${ API_CONFIG.baseUrl }/paredao/formarparedao`,
      paredao, 
      {   
        observe:'response',
        responseType: 'json'
      });
  }

  liberarParedao(paredao: ParedaoDTO) {
    return this.http.put(
      `${ API_CONFIG.baseUrl }/paredao/liberarparedao`,
      paredao, 
      {   
        observe:'response',
        responseType: 'json'
      });
  } 

  fecharParedao(paredao: ParedaoDTO) {
    return this.http.put(
      `${ API_CONFIG.baseUrl }/paredao/fecharparedao`,
      paredao, 
      {   
        observe:'response',
        responseType: 'json'
      });
  } 

  getProximoParedao(): Observable<ParedaoDTO> {
    return this.http.get<ParedaoDTO>(
      `${API_CONFIG.baseUrl}/paredao/proximoparedao`
    );
  }
}