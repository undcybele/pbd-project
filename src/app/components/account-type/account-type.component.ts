import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';
import {filter, map} from 'rxjs/operators';
import {AccountModel, accTypeEnum} from 'src/app/models/account.model';
import {TransactionModel} from 'src/app/models/transaction.model';
import {AccountService} from 'src/app/services/account.service';
import {TransactionService} from 'src/app/services/transaction.service';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.scss']
})
export class AccountTypeComponent implements OnInit {
  selectedValue: number;
  types = [
    {value: 0, viewValue: "CA"},
    {value: 1, viewValue: "PA"},
    {value: 2, viewValue: "AC"},
  ]
  transactionsType: TransactionModel[]

  transactions$: Observable<Array<TransactionModel>> = new Observable();
  accountsType$: Observable<Array<AccountModel>> = new Observable();


  constructor(
    private accService: AccountService,
    private transService: TransactionService,
  ) {
  }

  ngOnInit(): void {
  }

  getTransByType() {
    this.getTrans();
    this.accountsType$ = this.accService.getAllByType(this.selectedValue).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    )
    combineLatest(
      [
        this.accountsType$,
        this.transactions$,
      ]
    ).pipe(
      map(([accounts, transactions]) => {
        let all: Array<any> = [];
        accounts.map(acc => {
            let t = transactions.filter(trans => trans.idCredAcc === acc.accNumber || trans.idDebAcc === acc.accNumber)
            all = [...t, ...all];
          }
        )
        return all;
      })
    ).subscribe(data => this.transactionsType = data);
  }

  getTrans() {
    this.transactions$ = this.transService.getTransactions().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    );
  }

}
