import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {TransactionModel} from 'src/app/models/transaction.model';
import {TransactionService} from 'src/app/services/transaction.service';

@Component({
  selector: 'app-perioada-timp',
  templateUrl: './perioada-timp.component.html',
  styleUrls: ['./perioada-timp.component.scss']
})
//Să se afişeze toate tranzactiile care au fost introduse in perioada (01.01.2010-01.06.2010)
export class PerioadaTimpComponent implements OnInit {
  transactions: TransactionModel[]

  constructor(
    private transactionService: TransactionService,
  ) {
  }

  ngOnInit(): void {
    this.getTransactionsInbetween()
    if (this.transactions !== undefined)
      console.log(this.transactions)
  }

  getTransactionsInbetween() {
    this.transactionService.getTransactionsByDate()
      .snapshotChanges()
      .pipe(
      map(changes =>
        changes.map(c => ({...c.payload.doc.data()}))
      )
    ).subscribe(data => {
      this.transactions = data
      console.log(this.transactions)
    })
  }

}
