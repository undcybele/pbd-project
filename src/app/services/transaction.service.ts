import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { TransactionModel } from '../models/transaction.model';
import {filter, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  dbPath = "transactions"

  constructor(private afs: AngularFirestore) {
  }

  createTransactions(transaction: TransactionModel) {
    this.afs.collection<TransactionModel>(this.dbPath).add(transaction)
  }

  getTransactions() {
    return this.afs.collection<TransactionModel>(this.dbPath);
  }

  getTransactionsByAccountId(accNumber: number){
    let transactionsByAccountId: TransactionModel[] = [];
    this.getTransactions().snapshotChanges().pipe(
      map(changes =>
        changes.map (c => ({...c.payload.doc.data()}))
      )
      // map( c => (c.filter(
      //   d => {
      //     return (d.idCredAcc == accNumber || d.idDebAcc == accNumber)
      //   }
      //   )))
    ).subscribe(data => transactionsByAccountId = data)
    console.log(transactionsByAccountId);
    return transactionsByAccountId;
  }

  getTransactionsByDate() {
    let beginDate = new Date("01.01.2010").toLocaleString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    let endDate = new Date("01.06.2010").toLocaleString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    console.log(beginDate + " + " + endDate)
    return this.afs.collection<TransactionModel>(this.dbPath, ref =>
        ref
          .where('date', '>', beginDate)
          .where('date', '<', endDate))
  }
}
