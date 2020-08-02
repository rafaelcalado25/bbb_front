import { ParticipanteDTO } from './participante.dto';

export interface ParedaoDTO {
  id?: number;
  realizacao: Date,
  fechado?: boolean,
  dhFechamento?: Date;
  participantes: ParticipanteDTO[];
}