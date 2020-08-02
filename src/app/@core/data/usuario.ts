import { UsuarioDTO } from '../../../models/usuario.dto';
import { Observable } from 'rxjs';

export abstract class UsuarioData {
  
  abstract getUsuarioLogado(): Observable<UsuarioDTO>  ;
}