import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {TransactionModel} from '../models/transaction.model';

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
