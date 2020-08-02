import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../../config/api.config';
import { ParticipanteDTO } from '../../../models/participante.dto';
import { ParticipanteData } from '../data/participante';
import { UsuarioData } from '../data/usuario';
import { UsuarioDTO } from '../../../models/usuario.dto';

@Injectable()
export class UsuarioService extends UsuarioData {
  constructor(private http: HttpClient,) {
    super();
  }

  getUsuarioLogado(): Observable<UsuarioDTO>  {
    return this.http.get<UsuarioDTO>(
      `${API_CONFIG.baseUrl}/usuarios/usuarioLogado`
    );
  }
}