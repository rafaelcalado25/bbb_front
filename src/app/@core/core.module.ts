import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy, 
  NbAuthJWTToken, NB_AUTH_TOKEN_INTERCEPTOR_FILTER} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import {
  ParticipanteService,
  ParedaoService,
  VotacaoService,
} from './utils';
import { API_CONFIG } from '../../config/api.config';
import { HTTP_INTERCEPTORS, HttpRequest} from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { StorageService } from './data/storage.service';
import { ParedaoData } from './data/paredao';
import { ParticipanteData } from './data/participante';
import { VotacaoData } from './data/votacao';
import { UsuarioData } from './data/usuario';
import { UsuarioService } from './utils/usuario.service';




const DATA_SERVICES = [
  { provide: ParticipanteData, useClass: ParticipanteService },  
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: ParedaoData, useClass: ParedaoService },  
  { provide: VotacaoData, useClass: VotacaoService },
  { provide: UsuarioData, useClass: UsuarioService },
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbDummyAuthStrategy.setup({
        name: 'dummy',

        alwaysFail: false,
        delay: 14000,
      }),
      NbPasswordAuthStrategy.setup({
        name: 'email',  
        baseEndpoint: API_CONFIG.baseUrl,
        login: {
                // ...
                endpoint: '/login',
                method: 'post', 
                redirect: {
                  success: '/pages/votacao',
                  failure: null,
                },                 
                defaultErrors: ['Login/Senha informado errado'],
                defaultMessages: ['Login efetuado com sucesso!!'],
                //requireValidToken:true,
              }, 
              
        token: {                  
          class: NbAuthJWTToken,
          key: 'Authorization',
           getter: (module, res) => {        
             console.log(res);    
            return JSON.stringify(res.body[0]);         
          } ,
              
        }, 
        errors: {
          getter: (module, res, options) => {
            console.log(res);
            return res.error ? res.error.message : options[module].defaultErrors;
          },
        },  
      }),
    ],    
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  StorageService,

  { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, 
    useValue: function (req: HttpRequest<any>) {
      if(req.url == '/login'){          
        return true;
      }else {
        return false;
      }
      }},
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
