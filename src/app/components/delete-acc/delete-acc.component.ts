import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AccountModel} from 'src/app/models/account.model';
import {TransactionModel} from 'src/app/models/transaction.model';
import {AccountService} from 'src/app/services/account.service';
import {TransactionService} from 'src/app/services/transaction.service';

@Component({
  selector: 'app-delete-acc',
  templateUrl: './delete-acc.component.html',
  styleUrls: ['./delete-acc.component.scss']
})
export class DeleteAccComponent implements OnInit {
  accountTransactionsForm = new FormGroup({
    accNumber: new FormControl(0, [Validators.required, Validators.pattern('[0-9]{5}')])
  })

  transactions: Array<TransactionModel> = []
  accounts: Array<AccountModel> = []
  accountNumber: number

  constructor(
    private transService: TransactionService,
    private accountService: AccountService,
  ) {
  }

  ngOnInit(): void {
    this.getTrans()
  }

  onSubmit() {
    this.accountNumber = this.accountTransactionsForm.value.accNumber;
    this.deleteAcc(this.accountNumber)
  }

  deleteAcc(accNumber: number) {
    this.accountService.getAcc().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => {
            const data = c.payload.doc.data() as AccountModel;
            return {id: c.payload.doc.id, ...data};
          }
        )),
      map(changes =>
        changes.find(acc => acc.accNumber === accNumber)),
      map(acc => {
        if (this.getTransactionsByAccountId(acc.accNumber, this.transactions)) {
          window.alert("Acest cont este implicat in tranzactii si nu poate fi sters")
        } else {
          this.accountService.deleteAccount(acc.id).then(() => {
            return;
          })
          window.alert("Acest cont a fost sters cu succes!")
        }
      })
    ).subscribe()
  }

  getTransactionsByAccountId(acc: number, transactions: Array<TransactionModel>) {
    let transTotal = 0
    transactions.filter(trans =>
      trans.idDebAcc === acc || trans.idCredAcc === acc)
      .forEach(trans => {
          transTotal++
        }
      )
    return transTotal > 0 ? true : false
  }

  getTrans() {
    this.transService.getTransactions().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    ).subscribe(data => this.transactions = data)
  }
}
