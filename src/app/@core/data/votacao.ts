import { Observable } from 'rxjs';
import { ParticipanteDTO } from '../../../models/participante.dto';
import { VotacaoDTO } from '../../../models/votacao.dto';
import { ParedaoDTO } from '../../../models/paredao.dto';
import { RegistroVotacoesAgrupadoPorHoraDTO } from '../../../models/registrovotacoesagrupadoporhora.dto';


export abstract class VotacaoData {
  
  abstract efetuarVotacao(votacao: VotacaoDTO) ;
  abstract consultarVotacaoParticipante(participante: ParticipanteDTO): Observable<number>;
  abstract consultarVotacoesAgrupadasPorHora(paredao: ParedaoDTO): Observable<RegistroVotacoesAgrupadoPorHoraDTO[]> 
}
