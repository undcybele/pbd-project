import {Component, OnInit} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountModel} from 'src/app/models/account.model';
import {TransactionModel} from 'src/app/models/transaction.model';
import {AccountService} from 'src/app/services/account.service';
import {TransactionService} from 'src/app/services/transaction.service';
import {groupBy} from 'lodash';

@Component({
  selector: 'app-account-top',
  templateUrl: './account-top.component.html',
  styleUrls: ['./account-top.component.scss']
})
export class AccountTopComponent implements OnInit {

  freqVector = []
  maxTrans
  maxAccNumber

  transactions$: Observable<Array<TransactionModel>> = new Observable();
  accounts$: Observable<Array<AccountModel>> = new Observable();

  constructor(
    private transService: TransactionService,
    private accountService: AccountService,
  ) {
  }

  ngOnInit(): void {
    this.calculateFrequency()
    console.log(this.freqVector)
  }

  //Să se afiseze contul care apare in cele mai multe tranzactii precum si numarul de tranzactii in care el apare.
  calculateFrequency() {
    this.getAccs()
    this.getTrans()
    combineLatest([
      this.accounts$,
      this.transactions$
    ]).pipe(
      map(([accounts, transactions]) => {
        let all = []
        accounts.map(acc => {
          all.concat(this.getTransactionsByAccountId(acc.accNumber, transactions, all))
        })
        let max = all.reduce((a,b)=>a.transTotal>b.transTotal?a:b);
        this.maxAccNumber = max.accNumber
        this.maxTrans = max.transTotal
        return all;
      })
    ).subscribe(data => this.freqVector = data)
  }

  getTransactionsByAccountId(acc: number, transactions: Array<TransactionModel>, all){
    let transTotal = 0
    transactions.filter(trans =>
      trans.idDebAcc === acc || trans.idCredAcc === acc)
      .forEach(trans => {transTotal++}
      )
    all.push({accNumber: acc, transTotal: transTotal})
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
    this.transactions$ = this.transService.getTransactions().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    );
  }
}
