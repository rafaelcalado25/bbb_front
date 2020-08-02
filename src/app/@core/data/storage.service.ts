import { Injectable } from "@angular/core";
import { LocalUser } from "../../../models/localUser.dto";
import { STORAGE_KEYS } from "../../../config/storage_keys.config";
import { UsuarioDTO } from '../../../models/usuario.dto';

@Injectable()
export class StorageService {

  getLocalUser(): LocalUser {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);
    if (user ==null){
      return null;
    } else {
      return JSON.parse(user);
    }
    
  }

  setLocalUser(obj: LocalUser){
    if(obj == null){
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }else{
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
    }

  }

  getUsuarioLogado(): UsuarioDTO {
    let user = localStorage.getItem(STORAGE_KEYS.usuarioLogado);
    if (user ==null){
      return null;
    } else {
      return JSON.parse(user);
    }
    
  }

  setUsuarioLogado(obj: UsuarioDTO){
    if(obj == null){
      localStorage.removeItem(STORAGE_KEYS.usuarioLogado);
    }else{
      localStorage.setItem(STORAGE_KEYS.usuarioLogado, JSON.stringify(obj));
    }

  }

  
}