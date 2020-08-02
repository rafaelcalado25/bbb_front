import { Perfil } from "./perfil.dto";

export interface LocalUser {
  id: string;
  authorization: string;
  email: string;
  perfil?: Perfil;
  username?: string; 
  
}