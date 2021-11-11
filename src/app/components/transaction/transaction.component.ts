import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  transactionForm = new FormGroup({
    credAccNumber = new FormControl('', [Validators.required, Validators.maxLength(50)]),
    debAccNumber = new FormControl('', [Validators.required, Validators.maxLength(50)]),
    sum = new FormControl(0, [Validators.required, Validators.pattern('[0-9]{5}')]),
    desc = new FormControl('', [Validators.required, Validators.maxLength(10)])
  })
  transactions: TransactionModel[]
  constructor(
      private accService: TransactionService,
    ) { }

  ngOnInit(): void {
  }

}

