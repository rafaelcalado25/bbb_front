import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../../config/api.config';
import { ParticipanteDTO } from '../../../models/participante.dto';

@Injectable()
export class ParticipanteService {
  constructor(
    private http: HttpClient,
  ) {}

  getAllParticipantes(): Observable<ParticipanteDTO[]> {
    return this.http.get<ParticipanteDTO[]>(
      `${API_CONFIG.baseUrl}/participante/participantes`
    );
  }
}