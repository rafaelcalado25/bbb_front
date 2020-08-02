import { ParticipanteDTO } from './participante.dto';
import { UsuarioDTO } from './usuario.dto';
import { ParedaoDTO } from './paredao.dto';

export interface VotacaoDTO {
  id?: number,
  participante: ParticipanteDTO,
  usuario?: UsuarioDTO,
  paredao?: ParedaoDTO,
  dhVoto?: Date,
}