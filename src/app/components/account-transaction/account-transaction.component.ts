import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionModel} from "../../models/transaction.model";
import {map} from "rxjs/operators";
import {TransactionService} from "../../services/transaction.service";

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

  constructor(
    private transactionService: TransactionService
  ) { }

  onSubmit(): void{
    this.accountNumber = this.accountTransactionsForm.value.accNumber;
    console.log(this.accountNumber);
    this.accountTransactions = this.transactionService.getTransactionsByAccountId(this.accountNumber);
    console.log(this.accountTransactions);
  }

  ngOnInit(): void {

  }

}
