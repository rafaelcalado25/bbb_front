import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotacaoRoutingModule } from './votacao-routing.module';
import { VotacaoComponent } from './votacao.component';
import { NbActionsModule, NbUserModule, NbIconModule, NbListModule, NbTabsetModule, NbStepperModule, NbCardModule, NbSelectModule, NbCalendarModule, NbButtonModule, NbAlertModule, NbSpinnerModule, NbTreeGridModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabelaComponent } from './tabela/tabela.component';


@NgModule({
  declarations: [VotacaoComponent, TabelaComponent],
  imports: [
    CommonModule,
    VotacaoRoutingModule,
    NbActionsModule,
    NbUserModule,
    NbIconModule,
    NbListModule,
    NbTabsetModule,
    ThemeModule,
    NbCardModule,
    NbStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NbSelectModule,
    NbCalendarModule,
    NbButtonModule,
    NbAlertModule,
    NbSpinnerModule,
    NbTreeGridModule,
  ]
})
export class VotacaoModule { }
