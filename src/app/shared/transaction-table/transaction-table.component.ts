import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { TransactionModel } from 'src/app/models/transaction.model';
import {AccountModel} from "../../models/account.model";

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {
  @Input()
  data: TransactionModel[];
  dataSource;
  displayedColumns = ["transId", "date", "sum", "desc", "idDebAcc", "idCredAcc"]
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

}
