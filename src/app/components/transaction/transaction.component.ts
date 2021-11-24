import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {TransactionModel} from 'src/app/models/transaction.model';
import { AccountService } from 'src/app/services/account.service';
import {TransactionService} from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactionForm = new FormGroup({
    idCredAcc: new FormControl('', [Validators.required]),
    idDebAcc: new FormControl('', [Validators.required]),
    sum: new FormControl(0, [Validators.required]),
    desc: new FormControl('', [Validators.required]),
  })
  transactions: TransactionModel[]

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {
  }

  onSubmit(): void {
    if (this.transactions.length === 10000) {
      window.alert("Numarul maxim de tranzactii a fost atins!")
    } else {
      let transaction: TransactionModel = this.transactionForm.value
      transaction.date = new Date().toLocaleString()

      let newId = this.transactions.length
      transaction.transId = newId++

      this.accountService.updateSoldCurr(transaction.idCredAcc, transaction.sum)
      this.accountService.updateSoldCurr(transaction.idDebAcc, -transaction.sum)

      this.transactionService.createTransactions(transaction)
    }
  }

  ngOnInit(): void {
    this.getTrans()
  }

  getTrans() {
    this.transactionService.getTransactions().snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    ).subscribe(data => this.transactions = data)
  }
}
