import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionModel} from "../../models/transaction.model";
import {map} from "rxjs/operators";
import {TransactionService} from "../../services/transaction.service";
import { Observable } from 'rxjs';
import { AccountModel } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrls: ['./account-transaction.component.scss']
})
export class AccountTransactionComponent implements OnInit {
  accountTransactionsForm = new FormGroup({
    accNumber: new FormControl(0, [Validators.required, Validators.pattern('[0-9]{5}')])
  })
  accountTransactions: TransactionModel[] = []
  accountNumber: number

  transactions$: Observable<Array<TransactionModel>> = new Observable();
  accounts$: Observable<Array<AccountModel>> = new Observable();

  constructor(
    private transService: TransactionService,
    private accService: AccountService
  ) { }

  onSubmit(): void{
    this.accountNumber = this.accountTransactionsForm.value.accNumber;
    this.getTransactionsByAccountId(this.accountNumber);
  }

  ngOnInit(): void {}

  //returneaza toate tranzactiile pentru un singur cont
  getTransactionsByAccountId(accNumber: number){
    this.transService.getTransactions().snapshotChanges().pipe(
      map(changes =>
        changes.map (c => ({...c.payload.doc.data()}))
      ),
      map( c => (c.filter(
        d => {
          return (d.idCredAcc == accNumber || d.idDebAcc == accNumber)
        }
      )))
    ).subscribe(data => {this.accountTransactions = data})
  }

  getTrans() {
    this.transactions$ = this.transService.getTransactions().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    );
  }
}
