import {Input} from '@angular/core';
import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {combineLatest, Observable } from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
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
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  solduriTotale: Solduri[]

  transactions$: Observable<Array<TransactionModel>> = new Observable();
  accounts$: Observable<Array<AccountModel>> = new Observable();

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
  ) {
  }

  ngOnInit(): void {
    this.getTrans()
    this.getAccs()
    this.getAllBalances()
  }

  getAllBalances(){
    combineLatest(
      [this.accounts$,
      this.transactions$,
      ]
    ).pipe(
      map(([accounts, transactions]) => {
        let all = []
        accounts.map(acc => {
          all.concat(this.getTotalBalanceForSingleAcc(acc, transactions, all));
        })
        return all;
      })
    ).subscribe(data => {
      this.solduriTotale = data
    })
  }

  getTotalBalanceForSingleAcc(acc: AccountModel, transactions: Array<TransactionModel>, all) {
    let sumDeb = 0
    let sumCred = 0
    transactions.filter(trans =>
      trans.idDebAcc === acc.accNumber || trans.idCredAcc === acc.accNumber)
      .forEach(trans => {
          if (trans.idCredAcc === acc.accNumber) {
            sumCred += trans.sum
          } else {
            sumDeb += trans.sum
          }
        }
      )
    all.push({accNumber: acc.accNumber, soldInit: acc.soldInit, totalDeb: sumDeb, totalCred: sumCred})
    return all;
  }

  getAccs() {
    this.accounts$ = this.accountService.getAcc().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    );
  }

  getTrans() {
    this.transactions$ = this.transactionService.getTransactions().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    );
  }
}
