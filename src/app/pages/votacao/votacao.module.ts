import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VotacaoRoutingModule } from './votacao-routing.module';
import { VotacaoComponent } from './votacao.component';
import { NbActionsModule, NbUserModule, NbIconModule, NbListModule, NbTabsetModule, NbStepperModule, NbCardModule, NbSelectModule, NbCalendarModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VotacaoComponent],
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
  ]
})
export class VotacaoModule { }
