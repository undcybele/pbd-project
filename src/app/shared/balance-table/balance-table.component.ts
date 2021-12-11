import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountModel} from 'src/app/models/account.model';
import {TransactionModel} from 'src/app/models/transaction.model';
import {AccountService} from 'src/app/services/account.service';
import {TransactionService} from 'src/app/services/transaction.service';

type Solduri = {
  accNumber: number
  soldInit: number
  totalDeb: number
  totalCred: number
}

@Component({
  selector: 'app-balance-table',
  templateUrl: './balance-table.component.html',
  styleUrls: ['./balance-table.component.scss']
})
export class BalanceTableComponent implements OnInit {
  @Input()
  data: Array<Solduri>;
  dataSource;
  displayedColumns = ["accNumber", "soldInit", "soldDeb", "soldCred"]

  constructor() {}

  ngOnInit(): void {
  }
}
