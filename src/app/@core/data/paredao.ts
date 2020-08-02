import { Observable } from 'rxjs';
import { ParedaoDTO } from '../../../models/paredao.dto';


export abstract class ParedaoData {
  
  abstract getAllParedoes(): Observable<ParedaoDTO[]>;
  abstract getParedaoAtivo(): Observable<ParedaoDTO> ;

  abstract formarParedao(paredao: ParedaoDTO);

  abstract liberarParedao(paredao: ParedaoDTO);

  abstract fecharParedao(paredao: ParedaoDTO);

  abstract getProximoParedao(): Observable<ParedaoDTO> ;
}
