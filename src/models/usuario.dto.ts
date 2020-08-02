import { Perfil } from './perfil.dto';

export interface UsuarioDTO {
  id: number;
  username: string,
  perfis: Perfil,  
}