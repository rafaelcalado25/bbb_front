import { Component, OnInit, Input } from '@angular/core';
import { RegistroVotacoesAgrupadoPorHoraDTO } from '../../../../models/registrovotacoesagrupadoporhora.dto';
import { VotacaoData } from '../../../@core/data/votacao';
import { ParedaoDTO } from '../../../../models/paredao.dto';



@Component({
  selector: 'ngx-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {


  @Input() paredaoAtivo: ParedaoDTO;
  
  dataset: RegistroVotacoesAgrupadoPorHoraDTO[] = [];
  constructor(private votacaoService: VotacaoData,) { 
    setTimeout(() => {
      this.votacaoService.consultarVotacoesAgrupadasPorHora(this.paredaoAtivo).subscribe(
        response => {
          console.log(response);
          this.dataset = response;          
        }
      );
    }, 2000);   
  }

  ngOnInit(): void {
    setInterval(() => {
      this.votacaoService.consultarVotacoesAgrupadasPorHora(this.paredaoAtivo).subscribe(
        response => {
          console.log(response);
          this.dataset = response;          
        }
      );
    }, 10000);
  } 

}
