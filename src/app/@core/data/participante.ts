import { Observable } from 'rxjs';
import { ParticipanteDTO } from '../../../models/participante.dto';


export abstract class ParticipanteData {
  
  abstract getAllParticipantes(): Observable<ParticipanteDTO[]>  ;
}
